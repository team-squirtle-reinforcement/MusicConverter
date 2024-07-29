import React from 'react';
import axios from 'axios';

function App() {
  const getSpotfiyApi = ()=>{
    console.log('clicked button')
    axios('http://localhost:3000/spotify/apiRedirect').then(res=>{
      console.log(res.data);

      window.location.href = res.data.url;
    }).catch(err=>{
      console.log(err);
    });

  }

  const button = 'Press Me';
  return (
    <div>App
    <div>
        <button onClick={getSpotfiyApi} >Press Me</button>
      </div>
</div>
  )
}

export default App