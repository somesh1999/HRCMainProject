import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

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

class StatsSection extends Component {
  //const [spacing] = React.useState(2);
  //const classes = useStyles();

  constructor(props){
      super(props);


       var json = [{
        "id" : "1", 
        "title"   : "Total Customer",
        "subitem" : "2091"
      },
      {
          "id" : "2", 
          "title"   : "Total Open AR",
          "subitem" : "$43M"
      },
      {
          "id" : "3", 
          "title"   : "Average Days Delay",
          "subitem" : "3 Days"
      },
      {
          "id" : "4", 
          "title"   : "Total Open Invoices",
          "subitem" : "37438"
      }
      ];

      this.state = {
          spacing : 2,
          json : json,
      }
  }  

  
  

  /* Defining the card content */
 

render(){
  const { classes } = this.props;
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={this.state.spacing}>
          {/* {this.state.json.map((value) => ( */}
            <Grid key={1} item xs={12} sm={3}>
              {/* <Paper className={classes.paper} /> */}

                      <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none"}}>
                        <CardContent className={classes.card}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" style={{fontSize:"20px", color:"#A6ACAF "}}>
                            Total Customer
                          </Typography>
                           <Typography variant="h5" component="h2" style={{fontSize:"27px", color:"#fff", marginTop:"18px"}}>
                            {this.props.totalcustomer}  
                            </Typography>
                          
                        </CardContent>
                      </Card>


            </Grid>
            <Grid key={2} item xs={12} sm={3}>
              {/* <Paper className={classes.paper} /> */}

                      <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none"}}>
                        <CardContent className={classes.card}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" style={{fontSize:"20px", color:"#A6ACAF "}}>
                            Total Open AR
                          </Typography>
                           <Typography variant="h5" component="h2" style={{fontSize:"27px", color:"#fff", marginTop:"18px"}}>
                            ${this.props.totalOpenAr}M  
                            </Typography>
                          
                        </CardContent>
                      </Card>


            </Grid>

            <Grid key={3} item xs={12} sm={3}>
              {/* <Paper className={classes.paper} /> */}

                      <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none"}}>
                        <CardContent className={classes.card}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" style={{fontSize:"20px", color:"#A6ACAF "}}>
                            Average Days Delay
                          </Typography>
                           <Typography variant="h5" component="h2" style={{fontSize:"27px", color:"#fff", marginTop:"18px"}}>
                            {this.props.days_past_duedate} Days
                            </Typography>
                          
                        </CardContent>
                      </Card>


            </Grid>

            <Grid key={4} item xs={12} sm={3}>
              {/* <Paper className={classes.paper} /> */}

                      <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none"}}>
                        <CardContent className={classes.card}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" style={{fontSize:"20px", color:"#A6ACAF "}}>
                            Total Open Invoices
                          </Typography>
                           <Typography variant="h5" component="h2" style={{fontSize:"27px", color:"#fff", marginTop:"18px"}}>
                            {this.props.openinvoice}  
                            </Typography>
                          
                        </CardContent>
                      </Card>


            </Grid>
          {/* ))} */}
        </Grid>
      </Grid>
      
    </Grid>
  );
}
}

const mapStateToProps = (state) => {
  //console.log(state.totalcustomer);
  return {
    totalcustomer: state.totalcustomer, 
    totalOpenAr: state.totalOpenAr,
    days_past_duedate: state.days_past_duedate, 
    openinvoice: state.openinvoice, 
  }
}
 //export default withStyles(useStyles) (StatsSection)
// export default compose(
//   withStyles(useStyles),
//   connect(mapStateToProps),
// )(StatsSection);
export default connect(mapStateToProps)(withStyles(useStyles)(StatsSection))

