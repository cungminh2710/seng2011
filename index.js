const express = require('express');
const path = require('path');
const next = require('next');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dir: '.',
  dev
});
const handle = app.getRequestHandler();
const API = require('./src/api');

app.prepare()
  .then(_ => {
    const server = express();
    server.use(bodyParser.urlencoded({
      extended: true
    }));
    server.use(bodyParser.json());
    server.use(cookieParser());

    server.post('/api/register', (req, res) => API.auth.register(req, res));
    server.post('/api/login', (req, res) => API.auth.login(req, res));
    server.post('/api/place/autocomplete', API.google.autoCompleteEndpoint);
    server.post('/api/place/details', API.google.findPlaceDetailsEndpoint);
    server.post('/api/place/search', API.google.findPlaceNearbyEndpoint);

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, err => {
      if (err) throw error;

      console.log('> App running on port 3000');
    });
  });