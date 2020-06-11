import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppBar from './custom/appbar.js';
import StatsSection from './custom/statssection.js';
import BodySection from './custom/body.js';


function App() {
  return (
    <div className="App">
      <AppBar />
      <StatsSection />
      <BodySection />
    </div>
  );
}

export default App;
