import React, { useState, useEffect } from 'react';
import { AgGridReact }  from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();
    }, []);
    

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {setTrainings(data)
             console.log(data)}) 
        .then(err => console.log(err))
    }
  
    const columns =[
       { field: 'date',  cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm");}, sortable: true, filter: true},
       { field: 'duration', sortable: true, filter: true},
       { field: 'activity', sortable: true, filter: true},
       { field: 'customer.firstname', sortable: true, filter: true},
       { field: 'customer.lastname', sortable: true, filter: true},
      ]


    return(
      <div>
          <h1>Trainings</h1>
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
      </div>
    )
}


export default Traininglist;