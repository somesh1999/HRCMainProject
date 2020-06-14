import React from 'react';
// import logo from '../logo.svg';
import '../App.css';
import { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../assets/companyLogo.svg'
import FreedaBtn from '../assets/john.svg'
import AvatarImg from '../assets/avatar.svg'
import BotImg from '../assets/bot.webp'

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import StatsSection from '../custom/statssection.js';
import BodySection from '../custom/body.js';
import Footer from '../custom/footer.js';
import ClearIcon from '@material-ui/icons/Clear';

import InputAdornment from '@material-ui/core/InputAdornment';
import InputBase from '@material-ui/core/InputBase';
import SendIcon from '@material-ui/icons/Send';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CustomerInvoices from '../custom/customerinvoice';
import axios from 'axios';

const drawerWidth = 240;
const useStyles = (theme) => ({
  root: {
     display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
    
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop:60,
    height: `calc(100% - 100px)`,
    backgroundColor:"transparent",
    borderLeft:"1px solid #566573",
    borderTop: "1px solid rgb(255, 140, 0)"
   
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    //padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
     justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },

  inputBase: {
      border: "1px solid #85C1E9 ",
      width: "95%",
      borderRadius: "50px",
      paddingLeft: "15px",
      marginLeft: 15,
      backgroundColor: "rgba(100, 100, 100, 0.2)"

  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  chatBot:{
      paddingLeft:20,
      paddingTop:10
  }
});

class AppBarPage extends Component{
     constructor(props){
      super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {
            open : false,
            setOpen : open => this.setState({open}),

            responseData:"",
        };

        
        
    }  

    goBack() {
         this.props.history.goBack();
    } 


     sendrequest(){
             axios.post(`http://localhost:8080/1705745/fetchcustomername`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    params: { id: this.props.match.params.id },
                }
                )
                .then((response) => {

                    this.setState({
                        responseData : response.data[0],
                    });
                   
                })
                .catch((err) => {
                console.log(err);
                });

         

            }
             componentDidMount(){
            this.sendrequest();
           
        }

     render(){
         const { classes } = this.props;
         const handleDrawerOpen = () => {
            this.state.setOpen(true);
        };

         const handleDrawerClose = () => {
            this.state.setOpen(false);
        };
        return(
            <div>
            <AppBar position="static" color="transparent" style={{color: "#fff", boxShadow:"none"}}
            className={clsx(classes.appBar, {
                    // [classes.appBarShift]: this.state.open,
                })}
            
            >
                <Toolbar variant="dense" style={{paddingTop:5}}>
                {this.props.isCustomer === true? 
                 <ArrowBackIcon onClick={this.goBack} style={{cursor:"pointer"}}/>
                : <img alt="logo" src={Logo} style={{width:30}} /> }

               {this.props.isCustomer === true? 
               <span style={{flex:1, marginLeft:20}}>
                <Typography variant="h6" align="left" style={{fontSize:"22px", textTransform:"capitalize"}}>
                    {this.state.responseData.name_customer}
                </Typography>
                <Typography variant="subtitle2" align="left" style={{position:"absolute", marginTop:-7, color:"rgb(166, 172, 175)"}}>
                    {this.props.match.params.id}
                </Typography>
                </span>
                : <Typography variant="h6" align="left" style={{fontSize:"22px", fontWeight:"bold", flex:1, marginLeft:5}}>
                    ABC Products
                    </Typography> }
                
                    

                    <Typography variant="h6"  style={{fontSize:"13px",backgroundColor: "#FF8C00", position:"absolute", top:"0", left:"50%", transform: "translate(-50%)", padding:"2px 5px 2px 5px", borderRadius:"0px 0px 5px 5px" }}>
                    Receivables Dashboard
                    </Typography>
                    
                    <Button color="inherit" size="small" style={{backgroundColor: "#FF8C00", borderRadius:"20px", paddingLeft:8, fontSize:12}}
                    endIcon={<img src={FreedaBtn} alt="Freeda Btn" style={{width:25}}/>}
                    onClick={handleDrawerOpen}
                    //className={clsx(this.state.open && classes.hide)}
                    >Professor</Button>
                </Toolbar>
            </AppBar>
             <main
                    className={clsx(classes.content, {
                    [classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    
                    {this.props.isCustomer === true? 
                        <CustomerInvoices/> 
                    : <StatsSection/> }

                    {this.props.isCustomer === true? 
                        null
                    : <BodySection/> }


                     {/* <StatsSection /> */}
                    {/* <BodySection /> */}
                </main>
                <Footer />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={this.state.open}
                    classes={{
                    paper: classes.drawerPaper,
                    
                    }}
                   
                >
                    <div className={classes.drawerHeader}>
                     <Typography variant="h5" component="h6" style={{fontSize:14, textAlign:"left", flex:1, color:"rgb(166, 172, 175)", textTransform:"upperCase", paddingLeft:"20px", paddingTop:"10px"}}>
                        Professor
                        </Typography>

                        <ClearIcon style={{width:20, height:20, color:"rgb(166, 172, 175)",  marginRight:5, cursor:"pointer", paddingTop:"10px"}} onClick={handleDrawerClose}/>
                    </div>
                       <div className="main_div" style={{position:"relative", height:"100%"}}> 
                        
                        <div className="chatbody" style={{height:"88%", width:"100%", position:"absolute", overflowY:"auto",overflowX:"hidden", marginTop:20}}>
                                
                                {/* <div className={classes.chatBot}>
                                <Avatar alt="Remy Sharp" src={FreedaBtn} className={classes.small} />
                                 <Typography variant="h5" component="h6" style={{fontSize:14, color:"#fff"}}>
                                    Professor
                                    </Typography>
                                </div> */}

                                 <Grid container className={classes.chatBot} spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} sm={2}>

                                                  <Avatar alt="Remy Sharp" src={BotImg} className={classes.small} />
                                            </Grid>

                                            <Grid item xs={12} sm={10}>
                                             
                                            <Typography variant="h5" component="h6" style={{fontSize:13, color:"#fff", marginTop:3}} align="left">
                                               Hi John,
                                               how can I help you
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </Grid>



                                      <Grid container className={classes.chatBot} spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} sm={10}>
                                                <Typography variant="h5" component="h6" style={{fontSize:13, color:"#fff", marginTop:3, marginRight:10}} align="right">
                                               Show all the notes made in the last week for permalink
                                                </Typography>
                                                  
                                            </Grid>

                                            <Grid item xs={12} sm={2}>
                                             <Avatar alt="Remy Sharp" src={AvatarImg} className={classes.small} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </Grid>


                                    <Grid container className={classes.chatBot} spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12} sm={2}>

                                                  <Avatar alt="Remy Sharp" src={BotImg} className={classes.small} />
                                            </Grid>

                                            <Grid item xs={12} sm={10}>
                                             
                                            <Typography variant="h5" component="h6" style={{fontSize:13, color:"#fff", marginTop:3}} align="left">
                                               I found 6 notes made in last week for permalink
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </Grid>


                        </div>
                        <div className="chatInput" style={{position:"absolute", bottom:"15px"}}>  
                                            <InputBase
                                            style={{ color:"#fff", fontSize:"13px"}}
                                            className = {classes.inputBase}
                                            placeholder="Type here..."
                                            inputProps={{ 'aria-label': 'type here' }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                <SendIcon style={{ width:20, height:20, padding:"5.2px 5.2px 5.2px 5.2px", marginTop:"0px", background:"#5DADE2", borderRadius:"50%", position:"relative", left:3}} />
                                                </InputAdornment>
                                            }

                                        />
                        </div> 
                    </div> 
                </Drawer>
                </div>
        )
    };
}
//export default AppBarPage;
export default withStyles(useStyles, { withTheme: true })(AppBarPage)
