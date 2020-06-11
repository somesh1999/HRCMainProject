import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppBar from './custom/appbar.js';
import StatsSection from './custom/statssection.js';
import BodySection from './custom/body.js';
import Footer from './custom/footer.js';

function App() {
  return (
    <div className="App">
      <AppBar />
      <StatsSection />
      <BodySection />
      <Footer />
    </div>
  );
}

export default App;
