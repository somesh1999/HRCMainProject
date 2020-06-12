import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { Component } from 'react';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:5,
    paddingRight:5,
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

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 18,
    borderRadius: 0,
  },
  colorPrimary: {
    //backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    background: "transparent",
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#E5E7E9",
  },

  

}))(LinearProgress);

const BorderLinearProgress1 = withStyles((theme) => ({
  root: {
    height: 18,
    borderRadius: 0,
  },
  colorPrimary: {
    //backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    background: "transparent",
  },
  bar: {
    borderRadius: 0,
    backgroundColor: "#3498DB ",
  },

  

}))(LinearProgress);

class AmountCompanyCode extends Component {
//   const classes = useStyles();
//   const [spacing] = React.useState(2);
 constructor(props){
    super(props);
    var json = [{
        "id" : "1", 
        "title"   : "USA",
        "range" : 40,
        "progresstype" : "BorderLinearProgress"
    },
    {
        "id" : "2", 
        "title"   : "CAN",
        "range" : 30,
        "progresstype" : "BorderLinearProgress"
    },
    {
        "id" : "3", 
        "title"   : "IND",
        "range" : 50,
        "progresstype" : "BorderLinearProgress"
    },
    {
        "id" : "4", 
        "title"   : "UK",
        "range" : 100,
        "progresstype" : "BorderLinearProgress1"
    }
    ];

    this.state = {
          spacing : 2,
          json : json
      }
  } 

  render(){ 
      const { classes } = this.props;
        return (

                <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none", borderRadius:"0px", paddingLeft:"5px"}}>
                    <CardContent className={classes.card}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" align="left" style={{fontSize:"20px", color:"#A6ACAF ", marginTop: "-15px"}}>
                                Total Amount by Company Code
                        </Typography>

                        <Grid container className={classes.root} spacing={2} style={{marginTop: "18px"}}>
                            <Grid item xs={12}>
                                <Grid container spacing={this.state.spacing}>
                                {this.state.json.map((value) => (
                                    <Grid key= {value.id} item xs={12} style={{marginTop:"-5px"}}>
                                        <Grid container spacing={this.state.spacing}>
                                                <Grid key={value} item sm={1}>
                                                    <Typography className={classes.title} gutterBottom variant="h5" component="h2" align="left" style={{fontSize:"13px", color:"#fff", fontWeight:"bold"}}>
                                                            {value.title}  
                                                    </Typography>
                                                </Grid>
                                                <Grid key={value.id} item sm={11}>
                                                        {(value.range !== 100) ? (
                                                            <BorderLinearProgress variant="determinate" value={value.range}/>
                                                        ) : (
                                                            <BorderLinearProgress1 variant="determinate" value={value.range}/>
                                                        )}
                                                        
                                                </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                ))}
                                </Grid>
                            </Grid>
                            </Grid>

                        {/* <BorderLinearProgress variant="determinate" value={40}/>         
                        <BorderLinearProgress variant="determinate" value={30}/>         
                        <BorderLinearProgress variant="determinate" value={50}/>          */}
                        {/* <BorderLinearProgress1 variant="determinate" value={100}/>          */}
                    </CardContent>
                                
                </Card>
        );
}
}
export default withStyles(useStyles)(AmountCompanyCode)