import React, {Component} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import '../App.css';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { CSVLink } from "react-csv";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'company_id', numeric: false, disablePadding: true, label: 'Company ID' },
  { id: 'account_header_id', numeric: true, disablePadding: false, label: 'Account Header ID' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'Document Number' },
  { id: 'business_code', numeric: true, disablePadding: false, label: 'Business Code' },
  { id: 'doctype', numeric:true, disablePadding: false, label: 'Document Type' },
  { id: 'customer_number', numeric: true, disablePadding: false, label: 'Customer Number' },
  { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'Customer Map ID' },
//   { id: 'customer_name', numeric: true, disablePadding: false, label: 'Name Of Customer' },
  { id: 'document_create_date', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'baseline_create_date', numeric: true, disablePadding: false, label: 'Baseline Date' },
  { id: 'invoice_date_norm', numeric: true, disablePadding: false, label: 'Invoice Date' },
  { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice ID' },
  { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Customer Payment Terms' },
  { id: 'clearing_date', numeric: true, disablePadding: false, label: 'Clear Date' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoice' },
  { id: 'ship_date', numeric: true, disablePadding: false, label: 'Shipping Date' },
  { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment Amount' },
  { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days past Due date' },
  { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc Id' },
  { id: 'document_create_date1', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
  { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
  { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
  { id: 'predicted_payment_type', numeric: true, disablePadding: false, label: 'Predicted Payment Type' },
  { id: 'predicted_amoount', numeric: true, disablePadding: false, label: 'Predicted Amount' },

];

function EnhancedTableHead(props) {
 // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = props;


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.tablecells}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all data' }}
            color="primary"
            // borderColor = "primary"
            style= {{borderColor: "#fff", color:"#fff"}}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tablecell}
            style={{whiteSpace: "nowrap",   width: '2rem'}}
            
          >
            
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
           
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  //onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },

  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
    // fontSize:13,
    // color:"#fff",
    // borderBottom:"none",
  },
  
  multilineColor:{
    color:'#fff',
    }, 

     btn_header: {
       color:"rgb(93, 173, 226) ", border:"1px solid rgb(93, 173, 226) ", fontSize:"12px", backgroundColor:"#1B1F38",
        '&:hover': {
            background: "rgb(93, 173, 226)",
            color: '#FFF'
        }
    }

}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, buttonDisabled, buttonDisabledExport, headerResponse, selectedrows, indopenamount, indshipto, indacctheader } = props;
  var openamount,shipto;
  const [open, setOpen] = React.useState(false);
  
  const openModal = () =>{
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const modifydetails = () => {
            axios.post(`http://localhost:8080/1705745/modifydetails`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    params: { indacctheader: indacctheader, indopenamount: openamount, indshipto: shipto },
                }
                )
                .then((response) => {
                    handleClose();
                    
                    
                })
                .catch((err) => {
                console.log(err);
                });
  };

  let result = Array.from(headerResponse).map(a => a.total_open_amount);
  let result1 = Array.from(headerResponse).map(a => a.total_open_invoice);
  var total_open_amount =(result[0]/1000).toFixed(2);
  var total_open_invoice = result1[0];
  openamount = indopenamount;
  shipto = indshipto;
  const handlechange1=(event) =>{
      openamount = event.target.value;
  }
  const handlechange2=(event) =>{
    shipto = event.target.value;
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
       // [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        // <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        //   {numSelected} selected
        // </Typography>
        null
      ) : (
        // <Typography className={classes.title} variant="h6" id="tableTitle" component="div" style={{textAlign:"left", marginTop:20}}>
        //   <Button variant="contained" disabled style={{marginLeft:"-12px", color:"#D0D3D4 ", border:"1px solid #D0D3D4 ", fontSize:"12px", backgroundColor:"#1B1F38"}}>Modify</Button>
        //   <Button variant="contained" disabled style={{marginLeft:"10px", color:"#D0D3D4", border:"1px solid #D0D3D4 ", fontSize:"12px", backgroundColor:"#1B1F38"}}>Export</Button>
        // </Typography>
         null
        
      )}
        
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div" style={{textAlign:"left", marginTop:20}}>
           <Button variant="contained" disabled={buttonDisabled} style={ buttonDisabled ? {marginLeft:"-12px", color:"#D0D3D4 ", border:"1px solid #D0D3D4 ", fontSize:"12px", backgroundColor:"#1B1F38"} : {marginLeft:"-12px", color:"rgb(93, 173, 226) ", border:"1px solid rgb(93, 173, 226) ", fontSize:"12px", backgroundColor:"#1B1F38"} } onClick={openModal}>Modify</Button>
           <Button variant="contained" disabled={buttonDisabledExport} style={ buttonDisabledExport ? {marginLeft:"10px", color:"#D0D3D4 ", border:"1px solid #D0D3D4 ", fontSize:"12px", backgroundColor:"#1B1F38"} : {marginLeft:"10px", color:"rgb(93, 173, 226) ", border:"1px solid rgb(93, 173, 226) ", fontSize:"12px", backgroundColor:"#1B1F38"} } ><CSVLink data={selectedrows} style={{textDecoration:"none", color:"inherit"}}>Export</CSVLink></Button>

       </Typography>

      {/* Modal for Modifying records */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: { border:"1px solid #fff", width:500 }
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{background: "#1B1F38", color:"#fff" }}>{"Modify"}</DialogTitle>
        <DialogContent style={{background: "#1B1F38" }}>
          <DialogContentText id="alert-dialog-description">
                          
                                <Grid container className={classes.root} spacing={2} style={{marginTop:-5}}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                                <Grid key = "1" item xs={12} sm={4}>
                                                    <Typography variant="h6" component="h6" style={{fontSize:"14px", color:"rgb(166, 172, 175)", width:"100%"}}>Open Amount ($): </Typography>
                                                </Grid>

                                                   <Grid item xs={12} sm={8}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgb(166, 172, 175)", height:15, marginLeft:0, marginTop:3}} />
                                                    <FormControl className={classes.formControl} style={{position:"relative", marginTop: -23, marginLeft:20, width:"70%"}}>
                                                        <TextField
                                                            id="standard-helperText"
                                                            className= {classes.selectEmpty}
                                                            InputProps={{ disableUnderline: true,
                                                            classes: {
                                                                input: classes.multilineColor
                                                            }
                                                            }}
                                                            defaultValue={indopenamount}
                                                            onChange={handlechange1}
                                                            
                                                        />
                                                            
                                                        </FormControl>
                                                </Grid>

                                               
                                            </Grid>
                                        </Grid>   
                                        <Divider orientation="horizontal" variant="fullWidth" style={{backgroundColor:"#566573", width:"100%", marginTop:"-18px" }} />  

                                        <Grid item xs={12} style={{marginTop: "-10px"}}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} sm={4}>
                                                    <Typography variant="h6" component="h6" style={{fontSize:"14px", color:"rgb(166, 172, 175)", width:"100%"}}>Ship To </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={8}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgb(166, 172, 175)", height:15, marginLeft:0}} />
                                                    <FormControl className={classes.formControl} style={{position:"relative",top:-23, marginLeft:20, width:"70%"}}>
                                                        <TextField
                                                            id="standard-helperText"
                                                            className= {classes.selectEmpty}
                                                            InputProps={{ disableUnderline: true,
                                                            classes: {
                                                                input: classes.multilineColor
                                                            }
                                                            }}
                                                            defaultValue={indshipto}
                                                            onChange={handlechange2}
                                                        />
                                                            
                                                        </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>   
                                        <Divider orientation="horizontal" variant="fullWidth" style={{backgroundColor:"#566573", width:"100%", marginTop:"-23px" }} />  
                                </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{background: "#1B1F38", marginTop:-10, paddingBottom:15, paddingRight:20}}>
          <Button className={classes.btn_header} onClick={handleClose} variant="contained" >
            Cancel
          </Button>
          <Button className={classes.btn_header} onClick={modifydetails} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* End of modal */}

      {/* Statistics display */}
         <Grid container className={classes.root} spacing={2} style={{paddingTop:20, paddingBottom:20}} >
                                        <Grid item xs={12}>
                                            <Grid container spacing={0}>
                                            <Grid item xs={12} sm={4}>
                                                </Grid>
                                                <Grid item xs={12} sm={2}>
                                                    <Typography variant="h6" component="h6" style={{color:"#fff", fontSize:"18px"}} align="left">${total_open_amount}K</Typography>
                                                    <Typography variant="subtitle2" style={{color:"rgb(166, 172, 175)", fontSize:"13px", whiteSpace: "nowrap"}} align="left">Total Open Amount</Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={1}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgba(166, 172, 175, 0.4)", height:50, marginLeft:"20px"}} />
                                                    
                                                </Grid>

                                                 <Grid item xs={12} sm={2}>
                                                    <Typography variant="h6" component="h6" style={{color:"#fff", fontSize:"18px"}} align="left">{total_open_invoice}</Typography>
                                                    <Typography variant="subtitle2" style={{color:"rgb(166, 172, 175)", fontSize:"13px", whiteSpace: "nowrap"}} align="left">Total Open Invoices</Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={1}>
                                                    <Divider orientation="vertical" variant="inset" style={{backgroundColor:"rgba(166, 172, 175, 0.4)", height:50, marginLeft:"20px"}} />
                                                    
                                                </Grid>

                                                 <Grid item xs={12} sm={2}>
                                                    <Typography variant="h6" component="h6" style={{color:"#fff", fontSize:"18px"}} align="left">$1.2 M</Typography>
                                                    <Typography variant="subtitle2" style={{color:"rgb(166, 172, 175)", fontSize:"13px", whiteSpace: "nowrap"}} align="left">Predicted Amount</Typography>
                                                </Grid>

                                                
                                            </Grid>
                                        </Grid>   
                                        

                                        
                                </Grid>

      {/* End of statistics display */}
    
     
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({

  root: {
    flexGrow: 1,
    paddingLeft:25,
    paddingRight:25,
    paddingTop:20,
    
  },
  
  control: {
    padding: theme.spacing(2),
  },
  paper: {
    //width: '97%',
    width: `calc(100% - 30px)`,
    marginBottom: theme.spacing(2),
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'auto',
  },
  table: {
    minWidth: 750,
    backgroundColor:"#222a46",
    color: "#fff !important",
    
    
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
    color: "#fff !important",
  },

  tablecell:{
      color: "#fff !important",
      borderColor:"#566573",
      padding: 0,
      paddingRight:30,
       "&:hover": {
            color: "#fff !important"
        },
        "&:active": {
            color: "#fff"
        },
       
        
  },

  tablecells:{
      color: "#fff !important",
      borderColor:"#566573",
      padding: 0,
      
       "&:hover": {
            color: "#fff !important"
        },
        "&:active": {
            color: "#fff"
        },
       
        
  },


tablePagination: {
  },
tablePaginationCaption: {
    color: 'white'
  },
tablePaginationSelectIcon: {
    color: 'white'
  },
tablePaginationSelect: {
    color: 'white'
  },
tablePaginationActions: {
    color: 'rgb(93, 173, 226)',
  },

  
    
});

class CustomerInvoices extends Component {


   constructor(props){
      super(props);

      this.state = {
          responseData : "",
          setResponseData : responseData => this.setState({responseData}),

          order : "asc",
          setOrder: order => this.setState({order}),

          orderBy : '',
          setOrderBy: orderBy => this.setState({orderBy}),

          selected : [],
          setSelected: selected => this.setState({selected}),

          page : 0,
          setPage: page => this.setState({page}),

          dense : false,

          rowsPerPage: 10,
          setRowsPerPage: rowsPerPage => this.setState({rowsPerPage}),

          buttonDisabled:true,
          buttonDisabledExport:true,

          headerResponse: "",

          selectedArrayCsv: [],
          setSelectedcsv: selectedArrayCsv => this.setState({selectedArrayCsv}),

          indopenamount : "",
          indshipto : "",
          indacctheader: "",

          

      };
      this.fetchcustomerheader = this.fetchcustomerheader.bind(this);
        
  }  


   fetchcustomerheader(id){
     axios.post(`http://localhost:8080/1705745/fetchcustomerheader`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    params: { id: id },
                }
                )
                .then((response) => {
                    
                    this.setState({
                        headerResponse : response.data,
                    });
                })
                .catch((err) => {
                console.log(err);
                });
  }

  componentDidMount(){
            axios.post(`http://localhost:8080/1705745/fetchcustomerdetails`,
                {},
                {
                    headers: { "Content-Type": "application/json" },
                    params: { id: this.props.id },
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
                this.fetchcustomerheader(this.props.id);
    }

        


  render(){ 
            const { classes } = this.props;
    
            

            const handleSelectAllClick = (event) => {
                if (event.target.checked) {
                const newSelecteds = this.state.responseData.map((n) => n.acct_doc_header_id);
                const newSelectedrowss = this.state.responseData;
                this.state.setSelected(newSelecteds);
                this.state.setSelectedcsv(newSelectedrowss);
                this.setState({
                    buttonDisabled:true,
                    buttonDisabledExport:false,
                })
                return;
                }
                this.state.setSelected([]);
                if(!event.target.checked){
                  this.setState({
                    buttonDisabledExport:true
                  })
                }
            };

            const handleClick = (event, name, row) => {
                const selectedIndex = this.state.selected.indexOf(name);
                let newSelected = [];
                let newSelectedrow = [];
                if (selectedIndex === -1) {
                newSelected = newSelected.concat(this.state.selected, name);
                } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(this.state.selected.slice(1));
                } else if (selectedIndex === this.state.selected.length - 1) {
                newSelected = newSelected.concat(this.state.selected.slice(0, -1));
                } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    this.state.selected.slice(0, selectedIndex),
                    this.state.selected.slice(selectedIndex + 1),
                );
                }
                if (selectedIndex === -1) {
                  newSelectedrow = newSelectedrow.concat(this.state.selectedArrayCsv, row);
                } else if (selectedIndex === 0) {
                newSelectedrow = newSelectedrow.concat(this.state.selectedArrayCsv.slice(1));
                } else if (selectedIndex === this.state.selectedArrayCsv.length - 1) {
                newSelectedrow = newSelectedrow.concat(this.state.selectedArrayCsv.slice(0, -1));
                } else if (selectedIndex > 0) {
                newSelectedrow = newSelectedrow.concat(
                    this.state.selectedArrayCsv.slice(0, selectedIndex),
                    this.state.selectedArrayCsv.slice(selectedIndex + 1),
                );
                }
                this.state.setSelectedcsv(newSelectedrow);
                this.state.setSelected(newSelected);
                if(newSelected.length === 1){
                    this.setState({
                        buttonDisabled:false,
                    })
                }
                else{
                    this.setState({
                        buttonDisabled:true,
                    })
                }
                if(newSelected.length > 0){
                  this.setState({
                        buttonDisabledExport:false,
                    })

                }
                else{
                  this.setState({
                        buttonDisabledExport:true,
                    })
                }

                this.setState({
                  indopenamount : row.actual_outstanding_amount,
                  indshipto : row.shipping_to,
                  indacctheader: row.acct_doc_header_id
                })
            };

            const handleChangePage = (event, newPage) => {
                this.state.setPage(newPage);
            };

            const handleChangeRowsPerPage = (event) => {
                this.state.setRowsPerPage(parseInt(event.target.value, 10));
                this.state.setPage(0);
            };

            

            const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

            //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
            const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.responseData.length - this.state.page * this.state.rowsPerPage);

            return (
                <div className={classes.root}>
                <Paper className={classes.paper} style={{borderRadius: "0px", background: "rgba(133, 146, 158, 0.3 )"}}>
                    <EnhancedTableToolbar numSelected={this.state.selected.length} buttonDisabled={this.state.buttonDisabled} buttonDisabledExport={this.state.buttonDisabledExport} headerResponse={this.state.headerResponse} selectedrows={this.state.selectedArrayCsv} indopenamount={this.state.indopenamount} indshipto={this.state.indshipto} indacctheader={this.state.indacctheader} />
                    <TableContainer style={{ overflow: 'auto', maxHeight: '490px' }}>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={this.state.dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                        classes={classes}
                        numSelected={this.state.selected.length}
                        order={this.state.order}
                        orderBy={this.state.orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={this.state.responseData.length}
                        />
                        <TableBody>
                        {stableSort(Array.from(this.state.responseData), getComparator(this.state.order,this.state.orderBy))
                            .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.acct_doc_header_id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.acct_doc_header_id, row)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.acct_doc_header_id}
                                selected={isItemSelected}
                                >
                                <TableCell padding="checkbox" className={classes.tablecells}>
                                    <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    //    borderColor = "primary"
                                        style= {{borderColor: "#fff", color:"#fff"}}
                                    />
                                </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none" className={classes.tablecell}>
                                    {row.company_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.acct_doc_header_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.doc_number}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.business_code}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_type}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.cust_number}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.customer_map_id}</TableCell>
                                {/* <TableCell align="right" className={classes.tablecell}>
                                    {row.name_customer}</TableCell> */}
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_create_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.baseline_create_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.total_open_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.cust_payment_terms}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.clear_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.is_open_invoice}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.shipping_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.payment_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.days_past_duedate}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.doc_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_create_date_1}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.actual_outstanding_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.age_invoice}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_currency}</TableCell>
                                    <TableCell align="right" className={classes.tablecell}>
                                    </TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    </TableCell>
                                </TableRow>
                                
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (this.state.dense ? 50 : 53) * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={this.state.responseData.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    classes={{
                            root: classes.tablePagination,
                            caption: classes.tablePaginationCaption,
                            selectIcon: classes.tablePaginationSelectIcon,
                            select: classes.tablePaginationSelect,
                            actions: classes.tablePaginationActions,
                        }}
                    
                    />
                    
                </Paper>
                
                </div>
            );
}
}

export default withStyles(useStyles)(CustomerInvoices)