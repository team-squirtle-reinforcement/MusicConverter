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
    minWidth: '300px',
    height: '100%',

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '6rem',
    },
    [theme.breakpoints.down('sm')]: {
      gap: '0rem',
    }

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
      body: JSON.stringify({token: localStorage.getItem('spotify_access_token'),
            playlist_id: playlist_id,
            googleToken: localStorage.getItem('google')
      })})
      .then(res=>{
        console.log('res in get trackers', res);
        res.json().then(playlist_info=>{
          console.log('playlist_info in gettracker', playlist_info);
        });
      }).catch(err=>{
        console.log(err);
      })
    }

  const googleOauth = async () => {
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


function HomeContainer() {
  if(Cookies.get('spotify_access_token')){
    console.log('IN STORAGE UPDATE')
    localStorage.setItem('spotify_access_token', Cookies.get('spotify_access_token'));
    localStorage.setItem('spotify_refresh_token', Cookies.get('spotify_refresh_token'));
    //clear them so they aren't re-set every time.
    Cookies.remove('spotify_access_token');
    Cookies.remove('spotify_refresh_token');
  }

  if(Cookies.get('google')){
    console.log('IN GOOGLE STORAGE UPDATE')
    localStorage.setItem('google', Cookies.get('google'));
    Cookies.remove('google')
  }

  return (
    <FlexContainer className='FlexContainer' maxWidth='xl'>
        <Home getSpotifyApi={getSpotifyApi} getTracks={getTracks} googleOauth={googleOauth}/>
    </FlexContainer>
  )
}

export default HomeContainer;