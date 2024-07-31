import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  GlobalStyles,
  CircularProgress
} from '@mui/material';
import heroImage from '../../public/assets/heroImage.png';
import GoogleOauth from './GoogleOauth';
import customTheme, { spotifyThemeColor, youtTubeThemeColor } from '../theme/customTheme';

const HeroContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // centering buttons to the title
  alignItems: 'center',
  // width: '700px',
  // height: 'min-content',
  margin: 0,

  [theme.breakpoints.down('lg')]: {
    order: 2, // to place content below image on smaller screens
    alignItems: 'center',
    width: 'min-content',
  },

  // backgroundColor: 'blue',
}));

const HeroHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.white.main,
  textAlign: 'left',
  letterSpacing: '-.04em',
  display: 'inline',
  marginBottom: '32px',
  fontSize: 'clamp(6rem, 3rem + 6vw, 9rem)',
  lineHeight: '1.1',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',

  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(2rem, 2rem + 5vw, 5rem)',
  },
}));

const BaseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  fontSize: '1.5rem',
  width: '400px',
  marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: '.875rem',
    width: '300px',
  },
}));

const SpotifyButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: spotifyThemeColor, // Spotify brand color
  // marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${spotifyThemeColor}`,
  },
}));

const YouTubeButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: youtTubeThemeColor,
  // marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${youtTubeThemeColor}`,
  },
}));

// styling for playlist url input box
const UrlBox = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  marginBottom: '24px',
  '& .MuiInputBase-root': {
    height: '40px',
    borderRadius: '4px',
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: '10px 15px',
    textAlign: 'center',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.white.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.white.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.white.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '300px',
  },
}));

const TransferNowButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const HeroImage = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${heroImage})`,
  minWidth: '300px',
  maxWidth: '600px',
  width: '100%',
  minHeight: '450px',
  height: '100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPosition: 'center',

  [theme.breakpoints.down('lg')]: {
    maxHeight: '400px',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '400px',
  },

  // border: '2px solid green',
}));

function Home({ getSpotifyApi, googleOauth }) {
  const [loading, setLoading] = useState(false);

  // functionality
  const getTracks = async () => {
    console.log('clicked button');
    const textBox = document.getElementById('spotify-playlist');

    if(!textBox.value){
      console.log('TEXTBOX EMPTY');
      return;
    }

    let playlist_id = textBox.value.split('/');
    playlist_id = playlist_id[playlist_id.length - 1];
    playlist_id = playlist_id.split('?')[0];
    console.log('PLAYLIST ID: ', playlist_id);

    // set loading
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/spotify/getTrackData', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          token: window.localStorage.getItem('spotify_access_token'),
          playlist_id: playlist_id
        })
      });
      // end loading
      setLoading(false);
      console.log('res in get trackers', res);
      const playlist_info = await res.json();
      console.log('playlist_info in gettracker', playlist_info);
    } catch(err){
      // end loading
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            background: 'linear-gradient(to bottom, #000000, #333333)',
            minHeight: '100vh',
            position: 'relative',
          },
        }}
      />
      <HeroContent className='HeroContent'>
        <HeroHeading variant='h1'>Syncify.</HeroHeading>
        <SpotifyButton onClick={getSpotifyApi}>
          Connect to Spotify
        </SpotifyButton>
        <YouTubeButton onClick={googleOauth}>Connect to YouTube</YouTubeButton>
        <UrlBox
          id='spotify-playlist'
          variant='outlined'
          placeholder='Enter Spotify URL'
        />
        <TransferNowButton onClick={getTracks}>Transfer Now</TransferNowButton>
        {loading && <CircularProgress color='primary'/>}
      </HeroContent>

      <HeroImage className='HeroImage' />
    </>
  );
}

export default Home;
