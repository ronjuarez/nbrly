import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries';
import Header from './Header';
import Search from './Search';
import { FormControl, FormHelperText, InputLabel, Button, Grid, Typography, Select, MenuItem } from '@material-ui/core';

// import axios from 'axios';


export default function NewRequest ({
  newRequest,
  changeRequest,
  removeItem,
  setDate,
  request,
  addItem,
  requestDate,
  setCoords,
  setDeliveryAddress,
}) {

 

  return (
    <Grid
      container
      direction="row"

      >
        <Header />
      <Grid item 
      xs={false}
      sm={2}
      />
      <Grid
        item
        container
        xs={12} 
        sm={8}
        direction="column"
        justify="space-evenly"
        alignItems="center"
        >
          <Typography variant="h3">Form</Typography>
          <FormControl  
          onSubmit={newRequest}
          >
        
          <Typography>Delivery Address</Typography>

            <div><Search setCoords={setCoords} setAddress={setDeliveryAddress}/></div>

  

      <FormControl>
        <InputLabel>Reimbursement</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="reimbursement_type" 
          value={request.reimbursement_type} 
          onChange={changeRequest} 
          inputProps={{ 'aria-label': 'label'}}
          Placeholder="Reimbursement Method"

        >
          <MenuItem value={"cash"}>Cash</MenuItem>
          <MenuItem value={"prepaid"}>Prepaid</MenuItem>
          <MenuItem value={"e-transfer"}>E-transfer</MenuItem>
          <MenuItem value={"check"}>Check</MenuItem>
        </Select>
        <FormHelperText>Please choose a Reimbursement Method</FormHelperText>
      </FormControl>
      <div>
        < br />
        <Calendar 
          minDate={new Date()}
          value={requestDate}
          onChange={setDate}
          required
        />
      </div>
      <Grid 
      item
      >
        <Groceries 
          name="items"
          value={request.items}
          deleteItem={removeItem}
          addItem={addItem}
          required
        />
      </Grid>
      
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
   
        </FormControl>

      </Grid>
      <Grid 
      xs={false}
      sm={2}
      />
    </Grid>
    
  )
}

      
    
