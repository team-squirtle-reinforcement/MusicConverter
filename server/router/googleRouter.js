const express = require('express');
const Router = express.Router();
// const dotenv = require('dotenv');
const googleAuthController = require('../controllers/googleAuthController');
// dotenv.config();

Router.get('/', googleAuthController.googleOauth, (req, res) => {
  return res.status(200).json(res.locals.url);
});

Router.get(
  '/oauth2callback',
  googleAuthController.oauthCallback,
  (req, res) => {
    return res.redirect('http://localhost:8080');
  }
);

// Router.get('/playlist', googleAuthController.createPlaylist, googleAuthController.searchVideos, googleAuthController.addVideos, (req, res) => {
//   return res.status(200).json(res.locals.playlistItems)
// })

// Router.get('/search', googleAuthController.searchVideos, (req, res) => {
//   return res.status(200).json(res.locals.videoIDs)
// })

// googleRouter.post('/', )

module.exports = Router;
