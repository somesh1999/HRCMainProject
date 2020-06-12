import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppBar from './custom/appbar.js';
import StatsSection from './custom/statssection.js';
import BodySection from './custom/body.js';
import Footer from './custom/footer.js';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
    },
  },
  
});

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

export default withStyles(styles, { withTheme: true })(App);
