/* The .env file should have these variables defined for development:
TMDB_API_KEY, JWT_SECRET, DEV_DB_URL, DEV_DB_USER, DEV_DB_PASSWORD, DEV_DB_NAME
For production, these variables are needed on the .env or set directly on Heroku:
TMDB_API_KEY, JWT_SECRET, DATABASE_URL */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const db = require('./connectDB.js')(knex);
const app = express();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const config = require('./config');
const checkToken = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const logout = (req, res) => {
  res.cookie('token', "", { httpOnly: true });
  res.status(200).json({
    success: true,
    status_message: 'Authentication token cleared',
  });
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    db.select("user_password_hash", "user_name", "user_id").from("app_user").where("user_email", email)
      .then(results => {
        if (!results[0]) {
          return res.status(400).json({
            success: false,
            status_message: "No user found with that email"
          });
        }
        const name = results[0].user_name;
        const password_hash = results[0].user_password_hash;
        const id = results[0].id;
        if (bcrypt.compareSync(password, password_hash)) {
          const token = jwt.sign({ email: email, name: name, id: id }, config.secret, { expiresIn: '24h' });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({
            success: true,
            status_message: 'Authentication successful!',
            name: name
          });
        } else {
          res.status(403).json({
            success: false,
            status_message: 'Incorrect email or password'
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          status_message: 'Error connecting to database'
        });
      });
  } else {
    res.status(400).json({
      success: false,
      status_message: 'Authentication failed! Please check the request'
    });
  }
};

const register = (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    res.status(400).json("One of the items is blank.");
  } else {
    const password_hash = bcrypt.hashSync(password);
    db.insert({
      user_email: email,
      user_name: name,
      user_password_hash: password_hash,
      user_joined: new Date()
    }).into("app_user")
      .returning("user_id")
      .then(user_id => {
        const token = jwt.sign({ email: email, name: name, id: user_id[0] },
          config.secret, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({
          success: true,
          status_message: "User registered succesfully",
          name: name
        });
      })
      .catch(err => res.status(400).json({
        success: false,
        status_message: 'Unable to register'
      }));
  }
};

app.get("/api/logout", logout);

app.post("/api/register", register);

app.post("/api/login", login);

app.get("/api/getmein", checkToken, (req, res) => {
  res.json({
    success: true,
    name: req.decoded.name
  });
});

app.get('/api/search/:language/:title', checkToken, (req, res) => {
  const { language, title } = req.params;
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${title}&language=${language}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => {
      data.results.forEach((item) => {
        item.id = { media_type: item.media_type, media_tmdb_id: item.id };
      });
      res.json(data);
    })
    .catch(err => res.status(400).json({ success: false, status_message: "Could not connect to TMDb API" }));
});

app.get('/api/id/:language/:media_type/:id', checkToken, (req, res) => {
  const { language, media_type, id } = req.params;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    .then(response => response.json())
    .then(data => {
      data.id = { media_type: media_type, media_tmdb_id: data.id };
      res.json(data);
    })
    .catch(err => res.status(400).json({ success: false, status_message: "Could not connect to TMDb API" }));
});

app.get("/api/users", checkToken, (req, res) => {
  db.select("user_name as name", "user_id as id").from("app_user")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json({ success: false, status_message: "Could not connect to database" }));
});

app.get("/api/watchlist/get", checkToken, (req, res) => {
  const userId = req.decoded.id;
  db.select("media_tmdb_id", "media_type", "media_name").from("wants_to_watch").where("user_id", userId)
    .then(data => {
      const watchlist = data.map(item => {
        return {
          id: { media_type: item.media_type, media_tmdb_id: item.media_tmdb_id },
          name: item.media_name
        };
      });
      res.status(200).json({ success: true, watchlist: watchlist, status_message: "Got watchlist" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false, status_message: "Database could not fetch watchlist" });
    });
});

app.post("/api/watchlist/add", checkToken, (req, res) => {
  const { id, name } = req.body;
  const userId = req.decoded.id;
  db.raw('INSERT INTO media(media_tmdb_id, media_type) VALUES (:media_tmdb_id, :media_type) ON CONFLICT (media_tmdb_id, media_type) DO NOTHING', id)
    .then(results => {
      db.insert({
        media_tmdb_id: id.media_tmdb_id,
        media_type: id.media_type,
        media_name: name,
        user_id: userId
      })
        .into("wants_to_watch")
        .then(data => {
          res.status(200).json({ success: true, status_message: "Item added to watchlist" });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({ success: false, status_message: "Item already in watchlist" });
        });
    })
  .catch(err => {
    console.log(err);
    res.status(400).json({ success: false, status_message: err.toString() });
  });
});

app.post("/api/watchlist/remove", checkToken, (req, res) => {
  const userId = req.decoded.id;
  const { id } = req.body;
  db("wants_to_watch")
    .where("user_id", userId)
    .andWhere("media_type", id.media_type)
    .andWhere("media_tmdb_id", id.media_tmdb_id)
    .del()
    .then(data => {
      res.status(200).json({ success: true, status_message: "Item deleted from watchlist" });
    })
    .catch(err => res.status(400).json({ success: false, status_message: "Could not connect to database" }));
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));