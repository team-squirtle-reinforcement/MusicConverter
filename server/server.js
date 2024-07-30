const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('node:fs');
const PORT = process.env.port || 3000;

const spotifyController = require('./controllers/spotifyController');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(cookieParser());

app.get(
  '/spotify/apiRedirect',
  spotifyController.spotifyRedirect,
  (req, res) => {
    console.log(res.locals.result);
    res.status(200).json({ url: res.locals.result.url });
  }
);

app.get('/spotify/apiCatch', spotifyController.apiCatch, (req, res) => {
  console.log(res.locals.result);
  fs.rm(path.join(__dirname, '/controllers/', 'codeVerifier.json'), () => {});
  res.cookie('spotify_access_token', res.locals.result.access_token);
  res.cookie('spotify_refresh_token', res.locals.result.refresh_token);
  return res.redirect('http://localhost:8080');
});

// Catch-All Route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred', stuff: err },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
