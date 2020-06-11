import React from 'react';
// import logo from '../logo.svg';
import '../App.css';
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class AppBarPage extends Component{
     render(){
        return(
            <AppBar position="static" color="transparent" style={{color: "#fff", boxShadow:"none"}}>
                <Toolbar variant="dense">
                    <Typography variant="h6" align="left" style={{fontSize:"18px", fontWeight:"bold", flex:1, marginLeft:3}}>
                    ABC Products
                    </Typography>

                    <Typography variant="h6"  style={{fontSize:"13px",backgroundColor: "#FF8C00", position:"absolute", top:"0", left:"50%", transform: "translate(-50%)", padding:"2px 5px 2px 5px", borderRadius:"0px 0px 5px 5px" }}>
                    Receivables Dashboard
                    </Typography>
                    
                    <Button color="inherit" size="small" style={{backgroundColor: "#FF8C00", borderRadius:"20px", paddingLeft:20, paddingRight:20}}>Professor</Button>
                </Toolbar>
            </AppBar>
        )
    };
}
export default AppBarPage;
