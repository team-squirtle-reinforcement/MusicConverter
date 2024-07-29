require('dotenv').config();
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('path');

spotifyController = {};

spotifyController.spotifyRedirect = (req, res, next) => {
  const generateRandomString = (length) => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  //CODE VERIFIER
  const codeVerifier = generateRandomString(128);
  console.log('CODE VERIFIER: ', codeVerifier);

  const sha256 = (plain) => {
    const hash = crypto.createHash('sha256');
    hash.update(plain);
    const encoded = hash.digest('base64');
    return encoded;
  };

  // const base64encode = (input) => {
  //   return btoa(String.fromCharCode(...new Uint8Array(input)))
  //     .replace(/=/g, '')
  //     .replace(/\+/g, '-')
  //     .replace(/\//g, '_');
  // };

  //SHA VALUE
  const shaValue = sha256(codeVerifier);
  //CODE CHALLENGE
  const codeChallenge = sha256(codeVerifier); //base64encode(shaValue);

  //SET IN ENV
  const client_id = '952b1205b6bf4708b00d3391cbaee230';
  const scope = 'playlist-read-private';
  const authURL = new URL('https://accounts.spotify.com/authorize');
  //window.localStorage.setItem('code_verifier', codeVerifier);

  const params = {
    response_type: 'code',
    client_id: client_id,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: 'http://localhost:3000/spotify/apiCatch',
  };

  authURL.search = new URLSearchParams(params).toString();
  console.log(authURL);
  res.locals.result = { url: authURL.href, codeVerifier: codeVerifier };
  next();
};

spotifyController.apiCatch = (req, res, next) => {
  if (req.query.code) {
    console.log(req);
    fs.writeFile(
      path.join(__dirname, 'stuff.json'),
      JSON.stringify(req,null,2),
      (err) => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      }
    );
    console.log(req.query.code);
    console.log(req.session.codeVerifier);
  }

  next();
};

module.exports = spotifyController;
