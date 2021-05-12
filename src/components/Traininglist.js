import React, { useState, useEffect } from 'react';
import { AgGridReact }  from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

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

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const classes = useStyles();

    useEffect(() => {
        fetchTrainings();
    }, []);
    
    const openSnackBar = () => {
      setOpen(true);
    }

    const closeSnackBar = () => {
      setOpen(false);
    }

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {setTrainings(data)
             console.log(data)}) 
        .then(err => console.log(err))
    }
  
    const deleteTraining = (link) => {
      if (window.confirm('Are you sure?')){
          fetch(link, {method: 'DELETE'})
          .then(response => {
          if(response.ok) {
            fetchTrainings()
            setMsg('Training was deleted succesfully')
            setOpen(true)
            openSnackBar();
          } else {
              alert('Something went wrong in deletion');
            }
          })
          .catch(err => console.log(err))
          }
  }

    const columns =[
       { field: 'date',  cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, sortable: true, filter: true},
       { field: 'duration', sortable: true, filter: true},
       { field: 'activity', sortable: true, filter: true},
       { field: 'customer.firstname', sortable: true, filter: true},
       { field: 'customer.lastname', sortable: true, filter: true},
       {
        headerName: '',
        field: 'links',
        cellRendererFramework: params => 
        <IconButton color="secondary" onClick={()=> deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + params.data.id)}>
        <DeleteIcon />
      </IconButton>
    },
      ]


    return(
      <div>
         <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <h1>Trainings</h1>
          </Paper>
        </Grid>
        </Grid>
        </div>
        <div className="ag-theme-material" style={{height: 600, width: '90%', margin: 'auto'}}>
          <AgGridReact
            rowData={trainings}
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


export default Traininglist;