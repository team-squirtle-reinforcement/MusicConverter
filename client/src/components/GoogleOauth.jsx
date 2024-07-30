import React from 'react';

const GoogleOauth = () => {
  //need a button for youtube/ oauth login
  // const googleOauth = async () => {
  //   try {
  //     const response = await fetch('api/google');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     const url = await response.json();
  //     window.location.href = url;
  //   } catch (err) {
  //     console.error('There was a problem with the fetch operation:', err);
  //   }
  // };
  //this should go inside transfer now, after we get the all the list from spotify, we create a playlist then pass all songs
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
      {/* <button onClick={auth}>Sign in with google</button> */}
      <button onClick={create}>Create Playlist</button>
    </div>
  );
};

export default GoogleOauth;
