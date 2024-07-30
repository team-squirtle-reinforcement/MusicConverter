import React from 'react';
import GoogleOauth from './components/GoogleOauth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import customTheme from './theme/customTheme';
import HomeContainer from './containers/HomeContainer';

// define global styles
const GlobalStyle = createGlobalStyle`
  * {
    box-style: border-box;
    color: #01030B;
  }
  
  html {
    height: 100%;
    width: 100%;
    background-color: #01030B;

  }
  
  body {
    min-height: 1000px;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeContainer />}>
        </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
