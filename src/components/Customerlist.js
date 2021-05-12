import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact }  from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import EditCustomer from './EditCustomer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddTraining from './AddTraining';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const classes = useStyles();
    
    const openSnackBar = () => {
      setOpen(true);
    }

    const closeSnackBar = () => {
      setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => {setCustomers(data.content)
             console.log(data.content)}) 
        .then(err => console.log(err))
    }

    useEffect(() => {
      fetchCustomers();
  }, []);

    const addCustomer = (newCustomer) => {
      fetch('https://customerrest.herokuapp.com/api/customers',
      {
        method: 'POST',
        body: JSON.stringify(newCustomer),
        headers: { 'Content-type' : 'application/json' }
      })
      .then(_ => fetchCustomers())
      .then(_ => {
        setMsg('New customer added');
        setOpen(true);
      })
      .catch(err => console.error(err))  
    }

    const deleteCustomer = (link) => {
      if (window.confirm('Are you sure you want to delete?')) {
      fetch(link[0].href, { method: "DELETE" })
      .then(response => {
        if(response.ok) {
          fetchCustomers();
          setMsg('Customer deleted');
          openSnackBar();
      } else {
          alert('Something went wrong in deletion');
        }
      })
      .catch(err => console.err(err))
      }
    }

      const updateCustomer = (link, updateCustomer) => {
        fetch(link, {
          method: 'PUT',
          body: JSON.stringify(updateCustomer),
          headers: { 'Content-type' : 'application/json'}
        })
        .then(_ => fetchCustomers())
        .then(_ => {
        setMsg('Customer updated');
        setOpen(true);
    })
    .catch(err => console.error(err))  
  }

      /*const AddTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(training)
        })
        .then(_ => fetchCustomers())
        .then(_ => {
        setMsg('Training was added succesfully');
        setOpen(true);
      })
        .catch(err => console.log(err))
      }
  */
    const columns =[
      {
        headerName: '', 
        field: 'links',
        width: 80,
        cellRendererFramework: params => 
        <EditCustomer  updateCustomer={updateCustomer} params={params}/>
      },
      {
        headerName: '',
        field: 'links',
        width: 80,
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
      },
       { field: 'firstname', sortable: true, filter: true},
       { field: 'lastname', sortable: true, filter: true},
       { field: 'streetaddress', sortable: true, filter: true},
       { field: 'postcode', sortable: true, filter: true},
       { field: 'city', sortable: true, filter: true},
       { field: 'email', sortable: true, filter: true},
       { field: 'phone', sortable: true, filter: true},
       {
        headerName: '',
        field: 'links',
        cellRendererFramework: params => <AddTraining AddTraining={AddTraining} params={params}/>
    }
      ]


    return(
      <div>
        <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
            <h1>Customers</h1>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper} elevation={0}>
          <AddCustomer  addCustomer={addCustomer}/>
          </Paper>
        </Grid>
        </Grid>
        </div>
        <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto'}}>
          <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={8}
            floatingFilter={true}
            suppressCellSelection={true}
          />
        </div>
        <Snackbar open={open} autoHideDuration={3000} 
        onClose={closeSnackBar} message={msg} />
      </div>
    )
}


export default Customerlist;