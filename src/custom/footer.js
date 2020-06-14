import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor: "transparent",
  },
  footer: {
    backgroundColor: "transparent",
    position:"absolute",
    bottom:13,
    right:0,
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
        <footer className={classes.footer}>
            <Paper className={classes.root} elevation={1} style={{border:"1px solid transparent", boxShadow:"none"}}>
                <Typography variant="h5" component="h6" style={{fontSize:12, textAlign:"right", float:"right", color:"#fff", paddingRight:25}}>
                &copy; Copyright 2020 HighRadius. All Rights Reserved
                </Typography>
            </Paper>
            </footer>
  );
}