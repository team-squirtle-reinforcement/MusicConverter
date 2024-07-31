const dotenv = require('dotenv');
dotenv.config();
const { google } = require('googleapis');
const url = require('url');

const redirectUrl = 'http://localhost:8080/api/google/oauth2callback';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUrl
);

let userCredential = null;

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
    } catch (err) {
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
        userCredential = tokens;
        console.log(userCredential);
        // res.cookie('google', tokens, { httpOnly: true, secure: false });
      }
      return next();
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
    // const tokens = req.cookies.google;
    // console.log('tokens', req.cookies.google);
    // if (!tokens) {
    //   return next({
    //     log: 'Error in googleAuthController.createPlaylist middleware function: No tokens found',
    //     status: 401,
    //     message: {
    //       err: 'No tokens found for creating playlist',
    //     },
    //   });
    // }

    // oauth2Client.setCredentials(tokens);
    oauth2Client.setCredentials(userCredential);
    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
    try {
      const response = await youtube.playlists.insert({
        part: ['snippet,status'],
        resource: {
          snippet: {
            title: 'Spotify',
          },
          status: {
            privacyStatus: 'private',
          },
        },
      });
      console.log('Response data id', response.data.id);
      res.locals.playlistID = response.data.id;
      return next();
    } catch (err) {
      return next({
        log: `Error in googleAuthController.createPlaylist middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error creating a Youtube playlist for transfer',
        },
      });
    }
  },

  searchVideos: async (req, res, next) => {
    // const tokens = req.cookies.google;
    // console.log(tokens);
    // if (!tokens) {
    //   return next({
    //     log: 'Error in googleAuthController.searchVideos middleware function: No tokens found',
    //     status: 401,
    //     message: {
    //       err: 'No tokens found for searching videos',
    //     },
    //   });
    // }

    // oauth2Client.setCredentials(tokens);
    oauth2Client.setCredentials(userCredential);

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    const { result } = res.locals;
    console.log('result in searchvideos', result);
    console.log('tracks items', result.tracks.items);
    console.log();

    if (!result) {
      return next({
        log: 'Error in googleAuthController.searchVideos middleware function: No song provided',
        status: 400,
        message: {
          err: 'No query parameter provided for searching videos',
        },
      });
    }

    const queries = [];

    result.tracks.items.forEach((el) => {
      const query = el.track.name + ' ' + el.track.artists[0].name;
      queries.push(query);
    });

    console.log('queries in searchVideos: ', queries);

    try {
      const videoIDs = [];
      for (const query of queries) {
        const response = await youtube.search.list({
          part: 'snippet',
          q: query,
          maxResults: 1,
        });

        if (response.data.items.length > 0) {
          videoIDs.push(response.data.items[0].id.videoId);
        }
      }
      console.log('videoIDs in searchVideos: ', videoIDs);
      res.locals.videoIDs = videoIDs;
      return next();
    } catch (err) {
      return next({
        log: `Error in googleAuthController.searchVideos middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error searching for videos',
        },
      });
    }
  },

  addVideos: async (req, res, next) => {
    // const tokens = req.cookies.google;
    // console.log(tokens);
    // if (!tokens) {
    //   return next({
    //     log: 'Error in googleAuthController.addVideos middleware function: No tokens found',
    //     status: 401,
    //     message: {
    //       err: 'No tokens found for adding videos',
    //     },
    //   });
    // }

    // oauth2Client.setCredentials(tokens);
    oauth2Client.setCredentials(userCredential);

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    // const queries = req.query.q.split(',');
    // if (!queries || queries.length === 0) {
    //   return next({
    //     log: 'Error in googleAuthController.searchVideos middleware function: No query parameter provided',
    //     status: 400,
    //     message: {
    //       err: 'No query parameter provided for searching videos',
    //     },
    //   });
    // }
    const { playlistID } = res.locals;
    const { videoIDs } = res.locals;
    console.log(playlistID, videoIDs);
    try {
      for (const videoID of videoIDs) {
        const response = await youtube.playlistItems.insert({
          part: 'snippet',
          resource: {
            snippet: {
              playlistId: playlistID,
              position: 0,
              resourceId: {
                kind: 'youtube#video',
                videoId: videoID,
              },
            },
          },
        });
      }
      //   if (response.data.items.length > 0) {
      // videoIDs.push(response.data.items[0].id.videoId);
      //   }
      // }

      res.locals.message = 'Videos added to playlist successfully';
      return next();
    } catch (err) {
      return next({
        log: `Error in googleAuthController.addVideos middleware function: ${err}`,
        status: 500,
        message: {
          err: 'Error adding into playlist',
        },
      });
    }
  },
};

module.exports = googleAuthController;
