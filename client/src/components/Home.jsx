import React from 'react';
import { styled } from '@mui/system';
import { Box, Container, Typography, Button, TextField } from '@mui/material';
import heroImage from '../../public/assets/heroImage.png';
import { spotifyThemeColor, youtTubeThemeColor } from '../theme/customTheme';
import customTheme from '../theme/customTheme';

const HeroContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // width: '700px',
  // height: 'min-content',
  margin: 0,
  
  [theme.breakpoints.down('lg')]: {
      order: 2, // to place content below image on smaller screens
      alignItems: 'center',
      width: 'min-content',
  },

  // backgroundColor: 'blue',
}))

const HeroHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.white.main,
  textAlign: 'left',
  letterSpacing: '-.04em',
  display: 'inline',
  marginBottom: '12px',
  fontSize: 'clamp(5rem, 2rem + 5vw, 7rem)',

  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(2rem, 2rem + 5vw, 5rem)'
  }
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
  }

}));

const SpotifyButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: spotifyThemeColor, // Spotify brand color
  // marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${spotifyThemeColor}`,
  }
}));

const YouTubeButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: youtTubeThemeColor,
  // marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${youtTubeThemeColor}`,
  }
}));

const TransferNowButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

// const HomeInput = styled(TextField)(({ theme }) => ({
//   width: '400px',
//   // color: customTheme.palette.white.main,
//   color: 'red',
//   [theme.breakpoints.down('sm')]: {
//     width: '300px',
//     fontSize: '.2rem',
//     lineHeight: '1.2',
//     height: '50px',
//     backgroundColor: 'red',
//   }
// }));

const HomeInput = styled(TextField)(({ theme }) => ({
  width: '400px',
  '& .MuiInputBase-root': {
    // height: '40px', // Set a fixed height for the input base
    // padding: '0 8px', // Adjust padding to control height
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem', // Default font size
    padding: '8.5px 14px', // Adjust padding to control height
    [theme.breakpoints.down('sm')]: {
      fontSize: '.875rem', // Smaller font size for small screens
      lineHeight: '1.2',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: customTheme.palette.primary.main, // Primary color for the border
    },
    '&:hover fieldset': {
      borderColor: customTheme.palette.primary.main, // Primary color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: customTheme.palette.primary.main, // Primary color on focus
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '300px', // Smaller width for small screens
  },
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



function Home({ getSpotifyApi, getTracks }) {
  return (
    <>
      <HeroContent className='HeroContent'>
          <HeroHeading variant='h1'>TuneTransfer</HeroHeading>
          <SpotifyButton onClick={getSpotifyApi}>Connect to Spotify</SpotifyButton>
          <YouTubeButton>Connect to YouTube</YouTubeButton>
          <TransferNowButton onClick={getTracks}>Transfer Now</TransferNowButton>
          <HomeInput id='spotify-playlist' variant='outlined'></HomeInput>
      </HeroContent>
      <HeroImage className='HeroImage' />
    </>
  )
}

export default Home