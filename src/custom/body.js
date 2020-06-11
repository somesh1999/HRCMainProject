import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Invoices from '../custom/invoices.js';
import AmountCompanyCode from '../custom/amountcompanycode.js';
import SearchCompany from '../custom/searchcompany.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:25,
    paddingRight:25,
    paddingTop:5,
    
  },
  
  control: {
    padding: theme.spacing(2),
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

  card: {
    paddingTop: 25,
    paddingBottom: 25
  }

}));

export default function StatsSection() {
  const [spacing] = React.useState(2);
  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={spacing}>
            <Grid item xs={12} sm={4}>
                  
                  <AmountCompanyCode />
                  <SearchCompany/>

            </Grid>

             <Grid item xs={12} sm={8}>
                  
                <Invoices />

            </Grid>

        </Grid>
      </Grid>
      
    </Grid>
  );
}