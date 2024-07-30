import React from 'react';
import { styled } from '@mui/system';
import { Container } from '@mui/material';
import Home from '../components/Home';

function HomeContainer() {
  const FlexContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: 'auto',

    // backgroundColor: 'magenta',
  }));

  return (
    <FlexContainer className='FlexContainer'>
        <Home />
    </FlexContainer>
  )
}

export default HomeContainer;