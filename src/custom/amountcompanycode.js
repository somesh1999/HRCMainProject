import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Grid from '@material-ui/core/Grid';
import { Component } from 'react';

import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import crossfilter from 'crossfilter2';

import { connect } from 'react-redux';
import * as myActions from '../actions/myActions';
import {bindActionCreators} from "redux";

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

// const BorderLinearProgress = withStyles((theme) => ({
//   root: {
//     height: 18,
//     borderRadius: 0,
//   },
//   colorPrimary: {
//     //backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//     background: "transparent",
//   },
//   bar: {
//     borderRadius: 0,
//     backgroundColor: "#E5E7E9",
//   },

  

// }))(LinearProgress);

// const BorderLinearProgress1 = withStyles((theme) => ({
//   root: {
//     height: 18,
//     borderRadius: 0,
//   },
//   colorPrimary: {
//     //backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
//     background: "transparent",
//   },
//   bar: {
//     borderRadius: 0,
//     backgroundColor: "#3498DB ",
//   },

  

// }))(LinearProgress);





class AmountCompanyCode extends Component {
//   const classes = useStyles();
//   const [spacing] = React.useState(2);
 constructor(props){
    super(props);
    // var json = [{
    //     "id" : "1", 
    //     "title"   : "USA",
    //     "range" : 40,
    //     "progresstype" : "BorderLinearProgress"
    // },
    // {
    //     "id" : "2", 
    //     "title"   : "CAN",
    //     "range" : 30,
    //     "progresstype" : "BorderLinearProgress"
    // },
    // {
    //     "id" : "3", 
    //     "title"   : "IND",
    //     "range" : 50,
    //     "progresstype" : "BorderLinearProgress"
    // },
    // {
    //     "id" : "4", 
    //     "title"   : "UK",
    //     "range" : 100,
    //     "progresstype" : "BorderLinearProgress1"
    // }
    // ];
    
    this.state = {
          spacing : 2,
          json : "",

          stateflag : false,
          options:"",
          PrepareDataForHighCharts:this.PrepareDataForHighCharts.bind(this),
          reduceAdd:this.reduceAdd.bind(this),
          reduceRemove:this.reduceRemove.bind(this),
          reduceInitial:this.reduceInitial.bind(this),
          orderValue:this.orderValue.bind(this),

          SetTotalCustomer : this.SetTotalCustomer.bind(this),
          
    }
  } 


PrepareDataForHighCharts(groups) {
                var categories = [];
                var data = [];
                var gdata = groups.top(Infinity);
                gdata.forEach(d => {
                    categories.push(d.key);
                    data.push(d.value.totalopenamount);
                });

                return {
                    categories: categories,
                    data: data
                }

}

              reduceAdd(p, v) {
                p.totalopenamount += v.actual_outstanding_amount;
                p.days_past_duedate += v.days_past_duedate;
                p.totalcustomer++;
                if(v.is_open_invoice === 1){
                  p.openinvoice ++;
                }
                return p;
              };

              reduceRemove(p, v) {
                p.totalopenamount -= v.actual_outstanding_amount;
                p.days_past_duedate -= v.days_past_duedate;
                p.totalcustomer--;
                if(v.is_open_invoice === 1){
                  p.openinvoice --;
                }
                return p;
              };

              reduceInitial() {
                return {totalopenamount:0, totalcustomer: 0, days_past_duedate:0, openinvoice:0};
              };

              orderValue(p) {
                return p.totalopenamount;
              }



              SetTotalCustomer = (totalcustomer,totalOpenAr,days_past_duedate,openinvoice) =>{
                this.props.TotalData.SetTotalCustomer(totalcustomer);
                this.props.TotalData.SetTotalOpenAr(totalOpenAr);
                this.props.TotalData.SetTotalDaysPast(days_past_duedate);
                this.props.TotalData.SetTotalOpenInvoice(openinvoice);
              }

static getDerivedStateFromProps(nextProps, prevState){
  // var component = this;
  
  var comp_data = crossfilter(nextProps.sendJsonData);
  var totaldim = comp_data.dimension(d => d.business_code);
  //var total_amount = totaldim.group().reduceCount(d => d.actual_open_amount);
  var total_amount = totaldim.group().reduce(prevState.reduceAdd, prevState.reduceRemove, prevState.reduceInitial).order(prevState.orderValue);

  /* get data into state */
  var totalCustomer = 0;
  total_amount.all().forEach(d => {
        totalCustomer += d.value.totalcustomer;
  });
  var totalOpenAr = 0;
  total_amount.all().forEach(d => {
        totalOpenAr += d.value.totalopenamount;
  });
  var days_past_duedate = 0;
  total_amount.all().forEach(d => {
        days_past_duedate += d.value.days_past_duedate;
  });

  var openinvoice = 0;
  total_amount.all().forEach(d => {
        openinvoice += d.value.openinvoice;
  });
  prevState.SetTotalCustomer(totalCustomer,Math.round((Math.abs(Number(totalOpenAr)) / 1.0e+6)),Math.round(days_past_duedate/totalCustomer),openinvoice);
  
  
  var totaldim1 = comp_data.dimension(d => d.company_id);
  //var total_amount1 = totaldim1.group().reduceCount(d => d.actual_open_amount);
  var total_amount1 = totaldim1.group().reduce(prevState.reduceAdd, prevState.reduceRemove, prevState.reduceInitial).order(prevState.orderValue);

  
  var tempObject1 = prevState.PrepareDataForHighCharts(total_amount);
  var tempObject2 = prevState.PrepareDataForHighCharts(total_amount1);
  prevState.options = {
        chart:{
          type: 'bar',
          backgroundColor: "transparent",
          height:1200,
          marginLeft : 70,
          
        },
        title: {
              text: null,
          },
          colors : ["#E5E7E9"],
          legend: {
              enabled: false,
          },

          xAxis:{
           
             categories : tempObject1.categories, 
             lineWidth:0,
             labels: {
               useHTML : true,
                  style: {
                      color: "#fff",
                      textTransform:"uppercase",
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 'bold',
                      fontSize:"14px",
                      // paddingLeft:"20px"

                    
                  },
                  
                  align : "left",
              },
              offset : 50,        
              title: {
                  style:{
                    color:"#fff",
                    fontWeight:"bold"
                  }
              },
          },
          yAxis: {
            visible: false,
          },

          plotOptions: {
            series: {
              pointPadding: 0.12,

              point:{
                                events:{
                                    click: function(){
                                        this.select(null,true);
                                        var selectedPoints = this.series.chart.getSelectedPoints();
                                        var  filteredPoints = [];
                                        for (let index = 0; index < selectedPoints.length; index++) {
                                            filteredPoints.push(selectedPoints[index].category);            
                                        }// end of for loop

                                        function multivariateFunction(values){
                                            return function (v){
                                                return values.indexOf(v) !== -1;
                                            }
                                        }
                                        if(filteredPoints.length > 0){
                                            totaldim.filterFunction(multivariateFunction(filteredPoints));
                                        }else totaldim.filterAll();

                                        
                                        var totalCustomer = 0;
                                        total_amount1.all().forEach(d => {
                                              totalCustomer += d.value.totalcustomer;
                                        });
                                        var totalOpenAr = 0;
                                        total_amount1.all().forEach(d => {
                                              totalOpenAr += d.value.totalopenamount;
                                        });
                                        var days_past_duedate = 0;
                                        total_amount1.all().forEach(d => {
                                              days_past_duedate += d.value.days_past_duedate;
                                        });

                                        var openinvoice = 0;
                                        total_amount1.all().forEach(d => {
                                              openinvoice += d.value.openinvoice;
                                        });
                                        
                                        prevState.SetTotalCustomer(totalCustomer,Math.round((Math.abs(Number(totalOpenAr)) / 1.0e+6)),Math.round(days_past_duedate/totalCustomer),openinvoice);
  
                                        


                                    }
                                }
                            }
              

              },
          },
          series: [
            {
              name: 'Total Open Amount',
              data: tempObject1.data,
              
            }
          ]
  };
  
  

  return null;
  
}



 

  

  render(){ 
      const { classes } = this.props;
        return (

                <Card className={classes.root} style={{background: "rgba(133, 146, 158, 0.3 )", border:"none", boxShadow:"none", borderRadius:"0px", paddingLeft:"5px"}}>
                    <CardContent className={classes.card}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h5" component="h2" align="left" style={{fontSize:"20px", color:"#A6ACAF ", marginTop: "-15px"}}>
                                Total Amount by Company Code
                        </Typography>
                        <div style={{height:136, overflow:"auto", marginTop:10, paddingRight:10}}>
                        <HighChartsReact highcharts={HighCharts} options={this.state.options}/>
                        </div>
                        

                        {/* <Grid container className={classes.root} spacing={2} style={{marginTop: "18px"}}>
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
                            </Grid> */}

                        {/* <BorderLinearProgress variant="determinate" value={40}/>         
                        <BorderLinearProgress variant="determinate" value={30}/>         
                        <BorderLinearProgress variant="determinate" value={50}/>          */}
                        {/* <BorderLinearProgress1 variant="determinate" value={100}/>          */}
                    </CardContent>
                                
                </Card>
        );
}
}

const mapStateToProps = (state) => {
  //console.log(state.totalcustomer);
  return {
    totalcustomer: state.totalcustomer 
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    TotalData : bindActionCreators(myActions,dispatch)
  }
}
// export default withStyles(useStyles)(AmountCompanyCode)
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(AmountCompanyCode))