import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function App() {
  //should start a chain that ends up back at localhost:8080
  //with the spotify access token loaded into your cookies
  //need to find a way to load it into localStorage.
  const getSpotfiyApi = ()=>{
    console.log('clicked button')
    axios('http://localhost:3000/spotify/apiRedirect').then(res=>{
      console.log(res.data);

      //avoid cors by just sending the url and then redirecting
      //after.
      window.location.href = res.data.url;
    }).catch(err=>{
      console.log(err);
    });

  }

  const getTracks = ()=>{
    console.log('clicked button');
    const textBox = document.getElementById('spotify-playlist');
    let playlist_id = textBox.value.split('/');
    playlist_id = playlist_id[playlist_id.length - 1];
    playlist_id = playlist_id.split('?')[0];
    console.log('PLAYLIST ID: ', playlist_id);

    fetch('http://localhost:3000/spotify/getTrackData', {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({token: window.localStorage.getItem('spotify_access_token'),
            playlist_id: playlist_id
      })})
      .then(res=>{
        console.log(res);
        res.json().then(playlist_info=>{
          console.log(playlist_info);
        });
      }).catch(err=>{
        console.log(err);
      })
    }

  if(Cookies.get('spotify_access_token')){
    console.log('IN STORAGE UPDATE')
    window.localStorage.setItem('spotify_access_token', Cookies.get('spotify_access_token'));
    window.localStorage.setItem('spotify_refresh_token', Cookies.get('spotify_refresh_token'));
    //clear them so they aren't re-set every time.
    Cookies.remove('spotify_access_token');
    Cookies.remove('spotify_refresh_token');
  }

  const button = 'Press Me';
  return (
    <div>App
    <div>
        <button onClick={getSpotfiyApi} >Set Spotify Access Token</button>
        <br/>
        <input id='spotify-playlist'></input>
        <button onClick={getTracks} >Get Tracks</button>
      </div>
</div>
  )
}

export default App