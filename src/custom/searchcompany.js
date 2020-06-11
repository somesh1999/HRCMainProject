import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
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
        borderBottom: "none"
    },

    table: {
    minWidth: 400,
    marginTop:30
  },

     tablecellbody:{
        color: "#fff",
        borderColor: "#566573 ",
    },
    

}));



function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  
];

export default function SearchCompany() {
  const classes = useStyles();  
  return (

   
                 <TableContainer style={{marginTop:15, background: "rgba(133, 146, 158, 0.3 )", paddingTop:30, paddingBottom:25}}>
                <InputBase
                    style={{float:"left", color:"#fff", fontSize:"13px", paddingRight:10, marginLeft:15, width:"93%"}}
                    className = {classes.inputBase}
                    placeholder="Search Customers by Customer Name or Number"
                    inputProps={{ 'aria-label': 'search customer' }}
                    startAdornment={
                        <InputAdornment position="start">
                        <SearchIcon style={{ width:20, height:20, padding:"5.2px 5.2px 5.2px 5.2px", marginLeft:"-1", marginTop:"0.8", marginRight:5, background:"#5DADE2", borderRadius:"100%"}} />
                        </InputAdornment>
                    }

                    endAdornment={
                        <InputAdornment position="end" style={{marginLeft:"-20"}}>
                        <AttachMoneyIcon style={{width:20, height:20, color:"#85C1E9 "}} />
                        <ArrowDropDownIcon style={{width:20, height:20, marginLeft:"-7px", color:"#85C1E9 "}} />
                        </InputAdornment>
                    }
                />

                {/* <Container maxWidth="sm" align="left" className={classes.AdvancedSearchContainer}>
                <Typography variant="h6" component="h6" style={{fontSize:"15px", color:"rgb(166, 172, 175)"}}>Advanced Search</Typography>
                </Container> */}

                    <Table className={classes.table} size="small" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>Customer Name</TableCell>
                            <TableCell className={classes.tablecell} align="right">Customer Number</TableCell>
                            <TableCell className={classes.tablecell} align="right">Open Amount</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell className={classes.tablecellbody} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell className={classes.tablecellbody} align="right">{row.calories}</TableCell>
                            <TableCell className={classes.tablecellbody} align="right">{row.fat}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                
   
  );
}