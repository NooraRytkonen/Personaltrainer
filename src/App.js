import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, {useState} from 'react';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';

function App() {

  const [value, setValue] = useState('one');
  const handleChange= (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static" >
              <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers"/>
                <Tab value="two" label="Trainings"/>
              </Tabs>
      </AppBar>
        {value ==='one' && <div> <Customerlist/></div>}
        {value ==='two' && <div> <Traininglist/></div>}
    </div>
  );
}

export default App;
