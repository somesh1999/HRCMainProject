import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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

  /* Defining the card content */
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


  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={spacing}>
          {json.map((value) => (
            <Grid key={value.id} item xs={12} sm={3}>
              {/* <Paper className={classes.paper} /> */}

                      <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none"}}>
                        <CardContent className={classes.card}>
                          <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" style={{fontSize:"20px", color:"#A6ACAF "}}>
                            {value.title}
                          </Typography>
                           <Typography variant="h5" component="h2" style={{fontSize:"27px", color:"#fff", marginTop:"18px"}}>
                            {value.subitem}  
                            </Typography>
                          
                        </CardContent>
                        
                      </Card>


            </Grid>
          ))}
        </Grid>
      </Grid>
      
    </Grid>
  );
}