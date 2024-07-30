require("dotenv").config();
const crypto = require("node:crypto");
const fs = require("node:fs");
const { URLSearchParams } = require("node:url");
const path = require("path");

spotifyController = {};

spotifyController.spotifyRedirect = (req, res, next) => {
  const generateRandomString = (length) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  //CODE VERIFIER
  const codeVerifier = generateRandomString(128);
  console.log("CODE VERIFIER: ", codeVerifier);

  fs.writeFile(
    path.join(__dirname, "codeVerifier.json"),
    JSON.stringify({ codeVerifier: codeVerifier }),
    { flag: "w" },
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("file written successfully");

        const sha256 = (plain) => {
          const hash = crypto.createHash("sha256");
          hash.update(plain);
          const encoded = hash.digest("base64");
          return encoded
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
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
        const client_id = process.env.CLIENT_ID;
        const scope = "playlist-read-private";
        const authURL = new URL("https://accounts.spotify.com/authorize");
        //window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
          response_type: "code",
          client_id: client_id,
          scope,
          code_challenge_method: "S256",
          code_challenge: codeChallenge,
          redirect_uri: "http://localhost:3000/spotify/apiCatch",
        };

        authURL.search = new URLSearchParams(params).toString();
        console.log(authURL);
        res.locals.result = { url: authURL.href, codeVerifier: codeVerifier };
        return next();
      }
    }
  );
};

spotifyController.apiCatch = (req, res, next) => {
  if (req.query.code) {
    // console.log(req.query.code);
    const code = req.query.code;
    let codeVerifier;

    fs.readFile(
      path.join(__dirname, "codeVerifier.json"),
      "utf8",
      (err, data) => {
        if (err) console.log(err);
        else {
          const obj = JSON.parse(data);
          codeVerifier = obj.codeVerifier;
          console.log("CODE VERIFIER OTHER SIDE:", codeVerifier);

          const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: process.env.CLIENT_ID,
              grant_type: "authorization_code",
              code,
              redirect_uri: "http://localhost:3000/spotify/apiCatch",
              code_verifier: codeVerifier,
            }),
          };

          console.log(payload);
          fetch("https://accounts.spotify.com/api/token", payload)
            .then((result) => {
              result.json().then((json) => {
                console.log(json);
                res.locals.result = json;
                return next();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );
  }
};

module.exports = spotifyController;
