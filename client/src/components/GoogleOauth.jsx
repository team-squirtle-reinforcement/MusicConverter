import React from 'react';

const GoogleOauth = () => {
  // const auth = async () => {
  //   try{
  //     const response = await fetch('api/google')
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     const clientID = await response.json();
  //     // Google's OAuth 2.0 endpoint for requesting an access token
  //     const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  //     // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  //     const form = document.createElement('form');
  //     form.setAttribute('method', 'GET'); // Send as a GET request.
  //     form.setAttribute('action', oauth2Endpoint);

  //     // Parameters to pass to OAuth 2.0 endpoint.
  //     const params = {
  //       client_id: clientID,
  //       redirect_uri: 'http://localhost:8080/oauth2callback',
  //       response_type: 'token',
  //       scope: 'https://www.googleapis.com/auth/youtube',
  //       include_granted_scopes: 'true',
  //       state: 'pass-through value',
  //     };

  //     // Add form parameters as hidden input values.
  //     for (const p in params) {
  //       const input = document.createElement('input');
  //       input.setAttribute('type', 'hidden');
  //       input.setAttribute('name', p);
  //       input.setAttribute('value', params[p]);
  //       form.appendChild(input);
  //     }

  //     // Add form to page and submit it to open the OAuth 2.0 endpoint.
  //     document.body.appendChild(form);
  //     form.submit();
  //   } catch(err) {
  //     console.error('There was a problem with the fetch operation:', err);
  //   }

  // }

  const auth = async () => {
    try {
      const response = await fetch('api/google');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const url = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  };

  const create = async () => {
    try{
      const response = await fetch('api/google/playlist')
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const playlist = await response.json()
      console.log(playlist)
    } catch(err) {
      console.error('There was a problem with the fetch operation:', err);
    }
  }

  return (
    <div>
      <button onClick={auth}>Sign in with google</button>
      <button onClick={create}>Create Playlist</button>
    </div>
  );
};

export default GoogleOauth;
