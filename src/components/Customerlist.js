import React, { useState, useEffect } from 'react';
import { AgGridReact }  from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);
    

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => {setCustomers(data.content)
             console.log(data.content)}) 
        .then(err => console.log(err))
    }
  
    const columns =[
       { field: 'firstname', sortable: true, filter: true},
       { field: 'lastname', sortable: true, filter: true},
       { field: 'streetaddress', sortable: true, filter: true},
       { field: 'postcode', sortable: true, filter: true},
       { field: 'city', sortable: true, filter: true},
       { field: 'email', sortable: true, filter: true},
       { field: 'phone', sortable: true, filter: true},
      ]


    return(
      <div>
          <h1>Customers</h1>
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
      </div>
    )
}


export default Customerlist;