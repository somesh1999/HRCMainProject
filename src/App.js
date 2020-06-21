import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppBar from './custom/appbar.js';
// import StatsSection from './custom/statssection.js';
// import BodySection from './custom/body.js';
// import Footer from './custom/footer.js';
import { withStyles } from '@material-ui/core/styles';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Route from 'react-router-dom/Route';
import {ROLL_NUMBER} from '../src/utils/constants';


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
    <Router basename={`/${ROLL_NUMBER}`}>
      <Switch>
        <Route path="/" exact component={AppBar}/>
        <Route path="/view/customer/:id" exact component={(props) => <AppBar {...props} isCustomer={true} />} />
      </Switch>
      {/* <AppBar /> */}

    </Router>
      {/* <StatsSection />
      <BodySection />
      <Footer /> */}
      
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(App);
