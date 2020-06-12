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
// import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import '../App.css';
import axios from 'axios';




// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Donut', 452, 25.0, 51, 4.9),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
  
// ];

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
  { id: 'account_header_id', numeric: false, disablePadding: true, label: 'Account Header ID' },
  { id: 'company_id', numeric: true, disablePadding: false, label: 'Company ID' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'Document Number' },
  { id: 'document_number_norm', numeric: true, disablePadding: false, label: 'Document Number Normalised' },
  { id: 'business_code', numeric: true, disablePadding: false, label: 'Business Code' },
  { id: 'create_year', numeric: true, disablePadding: false, label: 'Create Year' },
  { id: 'document_line_number', numeric: true, disablePadding: false, label: 'Document Line number' },
  { id: 'doctype', numeric:true, disablePadding: false, label: 'Document Type' },
  { id: 'customer_number', numeric: true, disablePadding: false, label: 'Customer Number' },
  { id: 'customer_number_norm', numeric: true, disablePadding: false, label: 'Customer Number Normalised' },
  { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'Customer Map ID' },
  { id: 'customer_name', numeric: true, disablePadding: false, label: 'Name Of Customer' },
  { id: 'division', numeric: true, disablePadding: false, label: 'Division' },
  { id: 'document_create_date', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'document_create_date_norm', numeric: true, disablePadding: false, label: 'Document Create Date Normalised' },
  { id: 'posting_date', numeric: true, disablePadding: false, label: 'Posting date' },
  { id: 'posting_date_norm', numeric: true, disablePadding: false, label: 'Posting Date Normalised' },
  { id: 'posting_id', numeric: true, disablePadding: false, label: 'Posting ID' },
  { id: 'due_date', numeric: true, disablePadding: false, label: 'Due In Date' },
  { id: 'due_date_norm', numeric: true, disablePadding: false, label: 'Due In Date Normalised' },
  { id: 'order_date', numeric: true, disablePadding: false, label: 'Order create Date' },
  { id: 'order_date_norm', numeric: true, disablePadding: false, label: 'Order Create Date Normalised' },
  { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice ID' },
  { id: 'invoice_id_norm', numeric: true, disablePadding: false, label: 'Invoice ID Normalised' },
  { id: 'baseline_create_date', numeric: true, disablePadding: false, label: 'Baseline Date' },
  { id: 'invoice_date_norm', numeric: true, disablePadding: false, label: 'Invoice Date' },
  { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'total_open_amount_norm', numeric: true, disablePadding: false, label: 'Total Open Amount Normalised' },
  { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Customer Payment Terms' },
  { id: 'business_area', numeric: true, disablePadding: false, label: 'Area of Business' },
  { id: 'ship_date', numeric: true, disablePadding: false, label: 'Shipping Date' },
  { id: 'ship_to', numeric: true, disablePadding: false, label: 'Shipping To' },
  { id: 'clearing_date', numeric: true, disablePadding: false, label: 'Clear Date' },
  { id: 'clearing_date_norm', numeric: true, disablePadding: false, label: 'Clear Date Normalised' },
  { id: 'reason_code', numeric: true, disablePadding: false, label: 'Reason Code' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoicen' },
  { id: 'discount_due_date_norm', numeric: false, disablePadding: false, label: 'Discount Due Date Normalised' },
  { id: 'debit_credit_indicator', numeric: true, disablePadding: false, label: 'Debit Credit Status' },
  { id: 'payment_method', numeric: true, disablePadding: false, label: 'Payment Method' },
  { id: 'document_creation_date', numeric: true, disablePadding: false, label: 'Document Create Date' },
  { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
  { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc Id' },
  { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
  { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment Amount' },
  { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days past Due date' },
  { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
  { id: 'disputed_amount', numeric: true, disablePadding: false, label: 'Dispute Amount' },
  
];

function EnhancedTableHead(props) {
 // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.tablecells}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
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
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.tablecell}
              style={{whiteSpace: "nowrap"}}
            > */}
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            {/* </TableSortLabel> */}
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
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div" style={{textAlign:"left", color:"#A6ACAF ", fontSize: "18px"}}>
          Invoices
        </Typography>
         
        
      )}
    
     <Button variant="contained" style={{color:"#fff", fontWeight:"bold", background:"#909497", fontSize:"13px" }}>PREDICT</Button>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = (theme) => ({

  root: {
    width: '100%',
    
  },
  paper: {
    width: '97%',
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

//   caption: {
//     color: "#fff",
//   },
//   toolbar: {
//     "& > p:nth-of-type(2)": {
//       color: "#fff",
//     }
//   }

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
    color: 'white',
  },
  
});

class Invoices extends Component {

    //let [responseData, setResponseData] = React.useState('');
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     setResponseData(persons);
    //   })

//     const fetchData = React.useCallback(() => {
//     axios({
//       "method": "GET",
//       //"url": "https://jsonplaceholder.typicode.com/users",
//       "url": "http://localhost:8080/1705745/fetchdata",
//     })
//     .then((response) => {
//     //console.log(response.data);
//       setResponseData(response.data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   }, [])

//   React.useEffect(() => {
//     fetchData()
//   }, [fetchData])
  


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

          rowsPerPage: 12,
          setRowsPerPage: rowsPerPage => this.setState({rowsPerPage}),

          

      };
        
  }  

  componentDidMount(){
            axios({
            "method": "GET",
            "url": "http://localhost:8080/1705745/fetchdata",
            })
            .then((response) => {
            //console.log(response.data);
                this.setState({
                    responseData : response.data,
                })
            })
            .catch((error) => {
            console.log(error)
            })
    }

//   const classes = useStyles();
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [dense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(12);

  render(){ 
            const { classes } = this.props;
    
            // const handleRequestSort = (event, property) => {
            //     const isAsc = this.state.orderBy === property && this.state.order === 'asc';
            //     console.log(isAsc);
            //     this.state.setOrder(isAsc ? 'desc' : 'asc');
            //     this.state.setOrderBy(property);
                
            // };

            const handleSelectAllClick = (event) => {
                if (event.target.checked) {
                const newSelecteds = this.state.responseData.map((n) => n.name);
                this.state.setSelected(newSelecteds);
                return;
                }
                this.state.setSelected([]);
            };

            const handleClick = (event, name) => {
                const selectedIndex = this.state.selected.indexOf(name);
                let newSelected = [];

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

                this.state.setSelected(newSelected);
            };

            const handleChangePage = (event, newPage) => {
                this.state.setPage(newPage);
            };

            const handleChangeRowsPerPage = (event) => {
                this.state.setRowsPerPage(parseInt(event.target.value, 10));
                this.state.setPage(0);
            };

            //   const handleChangeDense = (event) => {
            //     setDense(event.target.checked);
            //   };

            const isSelected = (name) => this.state.selected.indexOf(name) !== -1;

            //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
            const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.responseData.length - this.state.page * this.state.rowsPerPage);

            return (
                <div className={classes.root}>
                <Paper className={classes.paper} style={{borderRadius: "0px", background: "rgba(133, 146, 158, 0.3 )"}}>
                    <EnhancedTableToolbar numSelected={this.state.selected.length} />
                    <TableContainer style={{ overflow: 'auto', height: '390px' }}>
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
                        //onRequestSort={handleRequestSort}
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
                                onClick={(event) => handleClick(event, row.acct_doc_header_id)}
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
                                {row.acct_doc_header_id}
                                </TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.company_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.doc_number}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.doc_number_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.business_code}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.create_year}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_line_number}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_type}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.cust_number}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.cust_number_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.customer_map_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.name_customer}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.division}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_create_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_create_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.posting_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.posting_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.posting_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.due_in_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.due_in_date_norm }</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.order_create_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.order_create_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_id_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.baseline_create_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.total_open_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.total_open_amount_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.cust_payment_terms}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.area_business}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.shipping_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.shipping_to}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.clear_date}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.clear_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.reason_code}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.is_open_invoice}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.discount_due_date_norm}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.debit_credit_status}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.payment_method}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.document_create_date_1}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.invoice_currency}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.doc_id}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.actual_outstanding_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.payment_amount}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.days_past_duedate}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.age_invoice}</TableCell>
                                <TableCell align="right" className={classes.tablecell}>
                                    {row.dispute_amount}</TableCell>
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
                    rowsPerPageOptions={[12, 100, 300]}
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

export default withStyles(useStyles)(Invoices)