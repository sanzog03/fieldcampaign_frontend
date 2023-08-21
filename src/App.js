import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment className="App heightFix">
      <CssBaseline />
      <Home/>
    </React.Fragment>
  );
}

export default App;
