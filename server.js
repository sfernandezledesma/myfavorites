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

function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  // For the given username fetch user from DB
  let mockedEmail = 'admin@gmail.com';
  let mockedUsername = 'admin';
  let mockedPassword = 'password';

  if (email && password) {
    if (email === mockedEmail && password === mockedPassword) {
      let token = jwt.sign({ email: email, username: mockedUsername },
        config.secret,
        {
          expiresIn: '24h' // expires in 24 hours
        }
      );
      // return the JWT token for the future API calls
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({
          success: true,
          message: 'Authentication successful!',
          username: mockedUsername
        });
    } else {
      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
}

app.post("/login", (req, res) => {
  login(req, res);
});

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
    .catch(err => res.status(400).json("Could not connect to TMDb API"));
});
app.get('/api/id/:language/:media_type/:id', (req, res) => {
  const { language, media_type, id } = req.params;
  fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Could not connect to TMDb API"));
});

app.get("/users", (req, res) => {
  db.select().from("users")
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json("Could not connect to database"));
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