import React from 'react';
import { styled } from '@mui/system';
import { Box, Container, Typography, Button } from '@mui/material';
import heroImage from '../../public/assets/heroImage.png';
import { spotifyThemeColor } from '../theme/customTheme';

const HeroContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '700px',
  height: 'min-content',

  // backgroundColor: 'blue',
}))

const HeroHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.white.main,
  textAlign: 'left',
  letterSpacing: '-.04em',
  display: 'inline',
  marginBottom: '12px',
}));

const BaseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.white.main,
  width: '400px',
  '&:hover': {
    outline: `2px solid ${theme.palette.primary.main}`,
  }
}));

const SpotifyButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: '#1ED760', // Spotify brand color
  marginBottom: '24px',
  '&:hover': {
    outline: `2px solid ${spotifyThemeColor}`,
  }
}));

const TransferNowButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const HeroImage = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${heroImage})`,
    width: '500px',
    height: '500px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',

    // border: '2px solid green',
}));



function Home({ getSpotifyApi, getTracks }) {
  return (
    <>
    {/* <Container sx={{backgroundColor:'magenta', borderRadius: '0.5em', minHeight: '100vh'}}>  */}
        {/* <Box sx={{display: 'flex', flexDirection: 'column'}}> */}
        <HeroContent className='HeroContent'>
            <HeroHeading variant='h1'>TuneTransfer</HeroHeading>
            <SpotifyButton onClick={getSpotifyApi}>Connect to Spotify</SpotifyButton>
            <TransferNowButton onClick={getTracks}>Transfer Now</TransferNowButton>
            <input id='spotify-playlist'></input>
        </HeroContent>
        {/* </Box> */}
        <HeroImage className='HeroImage' />
    {/* </Container> */}
    </>
  )
}

export default Home