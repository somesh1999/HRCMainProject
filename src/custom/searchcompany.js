import React, {Component} from 'react';
import { withStyles} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    marginTop:13,
    paddingBottom: 20
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
  },

  inputBase: {
      border: "1px solid #85C1E9 ",
      width: "100%",
      borderRadius: "50px",
    //   paddingLeft: "15px",
    //   paddingTop: "1px",
      paddingBottom: "1px",
      marginTop: -15
  },

    tablecell:{
        color: "rgb(166, 172, 175)",
        borderBottom: "none",
        whiteSpace: "nowrap",
        
    },

    table: {
    minWidth: 400,
    marginTop:30
  },

     tablecellbody:{
        color: "#fff",
        borderColor: "#566573 ",
        position:"relative",
        top:-5
    },

    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    fontSize:13,
    color:"#fff",
    borderBottom:"none",
  },
  icon: {
      color:"#85C1E9",
      fontSize:"20px"
      
  },
  multilineColor:{
    color:'#fff'
    }, 

    AdvancedSearchContainer:{
        marginBottom: "-40px"
    }

});


class SearchCompany extends Component {
//   const classes = useStyles(); 
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
 constructor(props){
      super(props);
      this.state = {
          age : "",
          setAge : "",
          responseData: "",
          incr : 0,
          clearIconDisplay:false,
          searchInputval: "",

          checked: false,

          totalOpenAmount : ""
      }

  }

        sendrequest(type){
             axios.post(`http://localhost:8080/1705745/fetchcustomerinfo`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    params: { type: type },
                }
                )
                .then((response) => {
                    this.setState({
                        responseData : response.data,
                    });
                })
                .catch((err) => {
                console.log(err);
                });

         

            }


            


    componentDidMount(){
            this.sendrequest("all");
           
        }

    handleKeyPress = (event) => {
        var code = event.keyCode || event.which;
        if(code === 13)
        {
                this.sendrequest(event.target.value);
                this.setState({
                    searchInputval : event.target.value,
                })
                if(event.target.value === ""){
                    this.setState({
                        clearIconDisplay: false,
                    })
                }
                else{
                    this.setState({
                        clearIconDisplay: true,
                    })
                }
        }
        
         //this.sendadvrequest(this.state.searchInputval);
       }   

        searchFieldChange(event){
        const inputName = event.target.value
        this.setState({
            searchInputval: inputName
        })
        if(event.target.value === ""){
            this.setState({
                clearIconDisplay: false,
            })
        }
        else{
            this.setState({
                clearIconDisplay: true,
            })
        }
        //this.sendrequest(inputName);
        //this.sendadvrequest(this.state.searchInputval);
        }

        searchBtn = () =>{
            this.sendrequest(this.state.searchInputval);
        }


       clearSearch = (event) => {
          this.setState({
              searchInputval: "",
              clearIconDisplay: false,
          })
          this.sendrequest("all");
       }

  render(){ 
     const { classes } = this.props; 
     const handleChange = (event) => {
        this.setState({
            age: event.target.value,
        })
        //console.log(event.target.value);
      };


      const handleadvClick = () =>{
          if(this.state.checked === false){
                this.setState({
                    checked : true,
                })
          }
          else{
              this.setState({
                 checked : false,
               })
          }
          
      }

      const typeOpenAmount = (event) =>{
          this.setState({
                totalOpenAmount: event.target.value,
          });

      }

      const setDataSearch = () => {
        var age;  
        if(this.state.age === ""){
            age = "<";
        }
        else{
            age = this.state.age;
        } 
        var searchInputvalstr =  "Customers with Open Amount "+age+" $"+this.state.totalOpenAmount+"";
        this.setState({
            searchInputval: searchInputvalstr,
        })
        
          handleadvClick();
          this.sendrequest(searchInputvalstr);
                if(searchInputvalstr === ""){
                    this.setState({
                        clearIconDisplay: false,
                    })
                }
                else{
                    this.setState({
                        clearIconDisplay: true,
                    })
                }
      }
      

     

            return (

            
                            <TableContainer style={{marginTop:15, background: "rgba(133, 146, 158, 0.3 )", paddingTop:30, paddingBottom:26, overflow: 'auto', height: '225px'}}>
                            <InputBase
                            
                                style={{float:"left", color:"#fff", fontSize:"13px", paddingRight:10, marginLeft:15, width:"93%"}}
                                className = {classes.inputBase}
                                placeholder="Search Customers by Customer Name or Number"
                                inputProps={{ 'aria-label': 'search customer' }}
                                onKeyUp={this.handleKeyPress}
                                value = {this.state.searchInputval}
                                onChange={this.searchFieldChange.bind(this)}
                                autoid="search-text-field"
                                startAdornment={
                                    <InputAdornment position="start">
                                    <SearchIcon style={{ width:20, height:20, padding:"5.2px 5.2px 5.2px 5.2px", marginLeft:"-1", marginTop:"0.8", marginRight:5, background:"#5DADE2", borderRadius:"100%", cursor:"pointer"}} onClick={this.searchBtn} autoid="search-icon"/>
                                    </InputAdornment>
                                }

                                endAdornment={
                                    <InputAdornment position="end" style={{marginLeft:"-20"}}>
                                     {this.state.clearIconDisplay === true? <ClearIcon style={{width:16, height:16, color:"#85C1E9 ", marginRight:5, cursor:"pointer"}} onClick={this.clearSearch} autoid="search-close-icon"/>: null }
                                    <AttachMoneyIcon style={{width:20, height:20, color:"#85C1E9 ", cursor:"pointer"}} onClick={handleadvClick}/>
                                    <ArrowDropDownIcon style={{width:20, height:20, marginLeft:"-7px", color:"#85C1E9", cursor:"pointer"}} onClick={handleadvClick}/>
                                    </InputAdornment>
                                }
                            />
                            <Fade in={this.state.checked}>
                            <Container maxWidth="sm" align="left" className={classes.AdvancedSearchContainer} style={this.state.checked ? {display:"block"}: {display:"none"}} autoid="advance-search-drop-down">
                            <Typography variant="h6" component="h6" style={{fontSize:"14px", color:"rgb(166, 172, 175)", marginTop:25, marginLeft:-5}}>Advanced Search</Typography>
                                <Grid container className={classes.root} spacing={2} style={{marginTop:-5}}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid key = "1" item xs={12} sm={2}>
                                                    <Typography variant="h6" component="h6" style={{fontSize:"13px", color:"rgb(166, 172, 175)", width:"100%"}}>Amount in: </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={10}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgb(166, 172, 175)", height:15}} />
                                                    <FormControl className={classes.formControl} style={{position:"relative",top:-47, marginLeft:100, width:"70%"}}>
                                                        <Select
                                                            value={this.state.age}
                                                            onChange={handleChange}
                                                            displayEmpty
                                                            className={classes.selectEmpty}
                                                            //inputProps={{ 'aria-label': 'Without label' }}
                                                            disableUnderline
                                                            inputProps={{
                                                                classes: {
                                                                    icon: classes.icon,
                                                                },
                                                            }}
                                                           
                                                            
                                                            >
                                                            <MenuItem value="">
                                                                Less than (&#x3C;)
                                                            </MenuItem>
                                                            <MenuItem value=">">Greater Than (>)</MenuItem>
                                                            <MenuItem value="<=">Less Than or Equal To (&#x3C;=)</MenuItem>
                                                            <MenuItem value=">=">Greater Than or Equal To (>=)</MenuItem>
                                                            <MenuItem value="!=">Not Equal To (!=)</MenuItem>
                                                            </Select>
                                                            
                                                        </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>   
                                        <Divider orientation="horizontal" variant="fullWidth" style={{backgroundColor:"#566573", width:"100%", marginTop:"-55px" }} />  

                                        <Grid item xs={12} style={{marginTop:"-43px"}}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} sm={3}>
                                                    <Typography variant="h6" component="h6" style={{fontSize:"13px", color:"rgb(166, 172, 175)", width:"100%"}}>Open Amount ($): </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={9}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgb(166, 172, 175)", height:15, marginLeft:40}} />
                                                    <FormControl className={classes.formControl} style={{position:"relative",top:-47, marginLeft:60, width:"70%"}}>
                                                        <TextField
                                                            id="standard-helperText"
                                                            className= {classes.selectEmpty}
                                                            InputProps={{ disableUnderline: true,
                                                            classes: {
                                                                input: classes.multilineColor
                                                            }
                                                            }}
                                                            onKeyUp = {typeOpenAmount}
                                                            autoid="advance-search-open-amount"
                                                        />
                                                            
                                                        </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>   
                                        <Divider orientation="horizontal" variant="fullWidth" style={{backgroundColor:"#566573", width:"100%", marginTop:"-55px" }} />  
                                </Grid>

                                <div style={{marginTop:-50, float:"right"}}>
                                <Button size="small" className={classes.margin}  variant="outlined" style={{borderColor:"#5DADE2", color:"#5DADE2"}} onClick={handleadvClick} autoid="advance-search-cancel">close</Button>
                                <Button size="small" className={classes.margin}  variant="contained" style={{marginLeft:10, backgroundColor:"#5DADE2", color:"#fff", fontWeight:"bold"}} onClick={setDataSearch} autoid="advance-search-button">search</Button>
                                </div>
                                


                            </Container>
                            </Fade>

                                <Table className={classes.table} size="small" aria-label="simple table" autoid="advance-search-table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tablecell}>Customer Name</TableCell>
                                        <TableCell className={classes.tablecell} align="right">Customer Number</TableCell>
                                        <TableCell className={classes.tablecell} align="right">Open Amount</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {Array.from(this.state.responseData).map((row) => (
                                        <TableRow key={row.cust_number}>
                                        <TableCell className={classes.tablecellbody} component="th" scope="row">
                                            <Link id={row.cust_number} to={`/view/customer/${row.cust_number}`} style={{color:"#fff", textDecoration:"none"}}>{row.name_customer}</Link>
                                        </TableCell>
                                        <TableCell className={classes.tablecellbody} align="right">{row.cust_number}</TableCell>
                                        <TableCell className={classes.tablecellbody} align="right">${row.total_open_amount}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>

                            
            
            );
}

}
export default withStyles(useStyles)(SearchCompany)