import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { styled } from '@mui/system';
import { Container } from '@mui/material';

import Home from '../components/Home';

const FlexContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    gap: 'auto',

    // backgroundColor: 'magenta',
  }));

//should start a chain that ends up back at localhost:8080
//with the spotify access token loaded into your cookies
//need to find a way to load it into localStorage.
const getSpotifyApi = ()=>{
  console.log('clicked button')
  axios('http://localhost:3000/spotify/apiRedirect').then(res=>{
    console.log('res.data:', res.data);

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



function HomeContainer() {
  if(Cookies.get('spotify_access_token')){
    console.log('IN STORAGE UPDATE')
    window.localStorage.setItem('spotify_access_token', Cookies.get('spotify_access_token'));
    window.localStorage.setItem('spotify_refresh_token', Cookies.get('spotify_refresh_token'));
    //clear them so they aren't re-set every time.
    Cookies.remove('spotify_access_token');
    Cookies.remove('spotify_refresh_token');
  }

  return (
    <FlexContainer className='FlexContainer' maxWidth='xl'>
        <Home getSpotifyApi={getSpotifyApi} getTracks={getTracks} />
    </FlexContainer>
  )
}

export default HomeContainer;