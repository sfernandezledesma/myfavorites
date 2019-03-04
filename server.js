require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const db = require('./connectDB.js').connectDB(knex);
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/searchmovies/:title', (req, res) => {
  const title = req.params.title;
  fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Could not connect to OMDb API"));
});

app.get('/api/id/:id', (req, res) => {
  const imdbID = req.params.id;
  fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbID}&plot=full`)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Could not connect to OMDb API"));
});

app.get("/users", (req, res) => {
  db.select().from("users")
  .then(users => {
    res.json(users);
  })
  .catch(err => res.status(400).json("Could not connect to database"));
});

// app.post('/api/world', (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));