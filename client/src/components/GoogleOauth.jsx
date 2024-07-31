import React from 'react';

const GoogleOauth = () => {
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

  // const search = async () => {
  //   try{
  //     const response = await fetch('api/google/search')
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  //     const videosIDs = await response.json()
  //     console.log(videosIDs)
  //   } catch(err) {
  //     console.error('There was a problem with the fetch operation:', err);
  //   }
  // }

  return (
    <div>
      {/* <button onClick={search}>Search Videos</button> */}
      <button onClick={create}>Create Playlist</button>
    </div>
  );
};

export default GoogleOauth;
