const express = require('express');
const morgan = require('morgan');

const server = express();

const cors = require('cors');
const movies = require('./routes/movies.js');
const genres = require('./routes/genres.js');

server.name = 'API';
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/movies', movies);
server.use('/genres', genres);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
