import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import '../App.css';
import axios from 'axios';




function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  
];

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
  { id: 'Account Header ID', numeric: true, disablePadding: true, label: 'Account Header ID' },
  { id: 'company_id', numeric: true, disablePadding: false, label: 'Company ID' },
  { id: 'document_number', numeric: true, disablePadding: false, label: 'Document Number' },
  { id: 'document_number_norm', numeric: true, disablePadding: false, label: 'Document Number Normalised' },
  { id: 'business_code', numeric: false, disablePadding: false, label: 'Business Code' },
  { id: 'create_year', numeric: false, disablePadding: false, label: 'Create Year' },
  { id: 'document_line_number', numeric: true, disablePadding: false, label: 'Document Line number' },
  { id: 'doctype', numeric:false, disablePadding: false, label: 'Document Type' },
  { id: 'customer_number', numeric: true, disablePadding: false, label: 'Customer Number' },
  { id: 'customer_number_norm', numeric: true, disablePadding: false, label: 'Customer Number Normalised' },
  { id: 'fk_customer_map_id', numeric: true, disablePadding: false, label: 'Customer Map ID' },
  { id: 'customer_name', numeric: false, disablePadding: false, label: 'Name Of Customer' },
  { id: 'division', numeric: false, disablePadding: false, label: 'Division' },
  { id: 'document_create_date', numeric: false, disablePadding: false, label: 'Document Create Date' },
  { id: 'document_create_date_norm', numeric: false, disablePadding: false, label: 'Document Create Date Normalised' },
  { id: 'posting_date', numeric: false, disablePadding: false, label: 'Posting date' },
  { id: 'posting_date_norm', numeric: false, disablePadding: false, label: 'Posting Date Normalised' },
  { id: 'posting_id', numeric: false, disablePadding: false, label: 'Posting ID' },
  { id: 'due_date', numeric: false, disablePadding: false, label: 'Due In Date' },
  { id: 'due_date_norm', numeric: false, disablePadding: false, label: 'Due In Date Normalised' },
  { id: 'order_date', numeric: false, disablePadding: false, label: 'Order create Date' },
  { id: 'order_date_norm', numeric: false, disablePadding: false, label: 'Order Create Date Normalised' },
  { id: 'invoice_id', numeric: true, disablePadding: false, label: 'Invoice ID' },
  { id: 'invoice_id_norm', numeric: true, disablePadding: false, label: 'Invoice ID Normalised' },
  { id: 'baseline_create_date', numeric: false, disablePadding: false, label: 'Baseline Date' },
  { id: 'invoice_date_norm', numeric: false, disablePadding: false, label: 'Invoice Date' },
  { id: 'total_open_amount', numeric: true, disablePadding: false, label: 'Total Open Amount' },
  { id: 'total_open_amount_norm', numeric: true, disablePadding: false, label: 'Total Open Amount Normalised' },
  { id: 'cust_payment_terms', numeric: true, disablePadding: false, label: 'Customer Payment Terms' },
  { id: 'business_area', numeric: false, disablePadding: false, label: 'Area of Business' },
  { id: 'ship_date', numeric: false, disablePadding: false, label: 'Shipping Date' },
  { id: 'ship_to', numeric: false, disablePadding: false, label: 'Shipping To' },
  { id: 'clearing_date', numeric: false, disablePadding: false, label: 'Clear Date' },
  { id: 'clearing_date_norm', numeric: false, disablePadding: false, label: 'Clear Date Normalised' },
  { id: 'reason_code', numeric: false, disablePadding: false, label: 'Reason Code' },
  { id: 'isOpen', numeric: true, disablePadding: false, label: 'Is Open Invoicen' },
  { id: 'discount_due_date_norm', numeric: false, disablePadding: false, label: 'Discount Due Date Normalised' },
  { id: 'debit_credit_indicator', numeric: false, disablePadding: false, label: 'Debit Credit Status' },
  { id: 'payment_method', numeric: false, disablePadding: false, label: 'Payment Method' },
  { id: 'document_creation_date', numeric: false, disablePadding: false, label: 'Document Create Date' },
  { id: 'invoice_amount_doc_currency', numeric: true, disablePadding: false, label: 'Invoice Currency' },
  { id: 'document_id', numeric: true, disablePadding: false, label: 'Doc Id' },
  { id: 'actual_open_amount', numeric: true, disablePadding: false, label: 'Actual Amount Outstanding' },
  { id: 'paid_amount', numeric: true, disablePadding: false, label: 'Payment Amount' },
  { id: 'dayspast_due', numeric: true, disablePadding: false, label: 'Days past Due date' },
  { id: 'invoice_age', numeric: true, disablePadding: false, label: 'Age of Invoice' },
  { id: 'disputed_amount', numeric: true, disablePadding: false, label: 'Dispute Amount' },
  
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.tablecell}>
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
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              className={classes.tablecell}

            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
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

const useStyles = makeStyles((theme) => ({

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
    color: "#fff !important"
  
    
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
  
}));

export default function Invoices() {

    let [responseData, setResponseData] = React.useState('');
    // axios.get(`https://jsonplaceholder.typicode.com/users`)
    //   .then(res => {
    //     const persons = res.data;
    //     setResponseData(persons);
    //   })

    const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://jsonplaceholder.typicode.com/users",
    })
    .then((response) => {
    //console.log(response.data);
      setResponseData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])
  
   

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  //const [dense, setDense] = React.useState(false);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} style={{borderRadius: "0px", background: "rgba(133, 146, 158, 0.3 )"}}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"

          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={responseData.length}
            />
            <TableBody>
              {stableSort(Array.from(responseData), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" className={classes.tablecell}>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        //    borderColor = "primary"
                            style= {{borderColor: "#fff", color:"#fff"}}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none" className={classes.tablecell}>
                       {row.name}
                      </TableCell>
                      <TableCell align="right" className={classes.tablecell}>{row.calories}</TableCell>
                      <TableCell align="right" className={classes.tablecell}>{row.fat}</TableCell>
                      <TableCell align="right" className={classes.tablecell}>{row.carbs}</TableCell>
                      <TableCell align="right" className={classes.tablecell}>{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 50 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 32]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
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