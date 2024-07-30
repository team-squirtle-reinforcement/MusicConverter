const dotenv = require('dotenv');
dotenv.config();
const { google } = require('googleapis');
const url = require('url');

const redirectUrl = 'http://localhost:8080/api/google/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  redirectUrl
);

let userCredential = null

const scopes = ['https://www.googleapis.com/auth/youtube'];

const googleAuthController = {
  googleOauth: async (req, res, next) => {
    try {
      // res.locals.clientID = process.env.CLIENT_ID
      res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
      // Generate a url that asks permissions for the Drive activity scope
      const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        // access_type: 'offline',
        /** Pass in the scopes array defined above.
         * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true,
        // Include the state parameter to reduce the risk of CSRF attacks.
        // state: state
      });

      res.locals.url = authorizationUrl;
      return next();
    } 
    catch (err) {
      return next({
        log: `Error in googleAuthController.googleOauth middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting client ID from environment variables',
        },
      });
    }
  },

  oauthCallback: async (req, res, next) => {
    try {
      // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');

      let q = url.parse(req.url, true).query;
      if (q.error) {
        // An error response e.g. error=access_denied
        console.log('Error:' + q.error);
      } else {
        // Get access and refresh tokens (if access_type is offline)
        let { tokens } = await oauth2Client.getToken(q.code);
        oauth2Client.setCredentials(tokens);  
        userCredential = tokens
        console.log(userCredential)
      }
      return next()
      
    } catch (err) {
      return next({
        log: `Error in googleAuthController.oauthCallback middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error getting response from google',
        },
      });
    }
  },

  createPlaylist: async (req, res, next) => {
    console.log('oauth2client b4 set credentials in createplaylist', oauth2Client)
    oauth2Client.setCredentials(tokens);
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    try{
      const response = await youtube.playlists.insert({
        "part": [
        "snippet,status"
      ],
      "resource": {
        "snippet": {
          "title": "Spotify"
        },
        "status": {
          "privacyStatus": "private"
        }
      }
    })
      console.log('Response', response)
      console.log('Response result', response.result)
      res.locals.playlist = response
      return next()
    } catch {
      return next({
        log: `Error in googleAuthController.createPlaylist middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error creating a Youtube playlist for transfer',
        },
      });
    }
  }
};

module.exports = googleAuthController;
