import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Invoices from '../custom/invoices.js';
import AmountCompanyCode from '../custom/amountcompanycode.js';
import SearchCompany from '../custom/searchcompany.js';
import { withStyles } from '@material-ui/core/styles';



const useStyles = (theme) => ({
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

});

class BodySection extends Component {

  constructor(props){
      super(props);
      this.state = {
          spacing : 2,

          jsonData: "", // data from invoice table
          
      }

      this.fetchJsonData = this.fetchJsonData.bind(this);
      
  }  

   fetchJsonData(data) {
      this.setState({
        jsonData : data,
      })
  }

  
  
  
 
  render(){  
//   const [spacing] = React.useState(2);
//   const classes = useStyles();
  const { classes } = this.props;
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={this.state.spacing}>
            <Grid item xs={12} sm={4}>
                  
                  <AmountCompanyCode sendJsonData={this.state.jsonData}/>
                  <SearchCompany />

            </Grid>

             <Grid item xs={12} sm={8}>
                  
                <Invoices />

            </Grid>

        </Grid>
      </Grid>
      
    </Grid>
  );
}

}

export default withStyles(useStyles)(BodySection)