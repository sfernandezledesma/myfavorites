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
    db.select("password_hash", "username").from("users").where("email", email)
      .then(results => {
        if (!results[0]) {
          return res.status(400).json({
            success: false,
            status_message: "No user found with that email"
          });
        }
        const username = results[0].username;
        const password_hash = results[0].password_hash;
        if (bcrypt.compareSync(password, password_hash)) {
          const token = jwt.sign({ email: email, username: username }, config.secret, { expiresIn: '24h' });
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({
            success: true,
            status_message: 'Authentication successful!',
            username: username
          });
        } else {
          res.status(403).json({
            success: false,
            status_message: 'Incorrect username or password'
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
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400).json("One of the items is blank.");
  } else {
    const password_hash = bcrypt.hashSync(password);
    db.insert({
      email: email,
      username: username,
      password_hash: password_hash,
      joined: new Date()
    }).into("users")
      .returning("username")
      .then(registeredUsername => {
        const token = jwt.sign({ email: email, username: registeredUsername[0] },
          config.secret, { expiresIn: '24h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({
          success: true,
          status_message: "User registered succesfully",
          username: registeredUsername[0]
        });
      })
      .catch(err => res.status(400).json({
        success: false,
        status_message: 'Unable to register'
      }));
  }
};

app.get("/logout", logout);

app.post("/register", register);

app.post("/login", login);

app.get("/getmein", checkToken, (req, res) => {
  res.json({
    success: true,
    username: req.decoded.username
  });
});

app.get('/api/search/:language/:title', (req, res) => {
  const { language, title } = req.params;
  fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${title}&language=${language}&page=1&include_adult=false`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json({success: false, status_message: "Could not connect to TMDb API"}));
});
app.get('/api/id/:language/:media_type/:id', (req, res) => {
  const { language, media_type, id } = req.params;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json({success: false, status_message: "Could not connect to TMDb API"}));
});

app.get("/users", (req, res) => {
  db.select().from("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json({success: false, status_message: "Could not connect to database"}));
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