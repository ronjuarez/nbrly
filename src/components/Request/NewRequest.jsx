import React from 'react';
// import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
// import { NavLink } from "react-router-dom";
import { FormControl, FormHelperText, InputLabel, Button, Grid, Typography, Select, MenuItem } from '@material-ui/core';

// import axios from 'axios';
import { useLoadScript} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
const libraries = ["places"];



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

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
     libraries 
    })
    

  function Search() {
    const {
      ready,  
      value, 
      suggestions: {status, data}, 
      setValue, 
      clearSuggestions
    } = usePlacesAutocomplete({
    
    })
    return (
      <div>
      <Combobox 
          
          onSelect={async (address) => {
            setValue(address, false);
            
            clearSuggestions();
            try {
              const results = await getGeocode({address})
              // console.log(results[0].formatted_address)
              setDeliveryAddress(results[0].formatted_address)
              const lat = await getLatLng(results[0])
              const lng = await getLatLng(results[0])
              const latitude = lat.lat;
              const longitude = lng.lng;
              // console.log(latitude, longitude)
              setCoords(latitude, longitude)
        
            } catch(error) {
              console.log(error)
            }
          }}>
        <ComboboxInput
          style={{width:"100%"}}
          value={value} 
          onChange={(e) => {setValue(e.target.value)}}
          setValue={setValue}
          disabled={!ready}
          placeholder="Enter your address"
        />
        <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({id, description}) => 
          (<ComboboxOption key={id} value ={description}/>
          ))}
          </ComboboxList>
  
        </ComboboxPopover>
      </Combobox>
      </div>
      
  
     )
  }
   



  return (
    <Grid 
      container
      direction="row"

      >
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
          <Typography variant="h2">Form</Typography>
          <FormControl  
          onSubmit={newRequest}
          >
        
          <Typography>Delivery Address</Typography>

            <div><Search/></div>

  

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
    
      {/* <select 
        name="reimbursement_type" 
        value={request.reimbursement_type} 
        onChange={changeRequest}  
      > 
        <option selected name="reimbursement_type" value="">choose one</option>
        <option name="reimbursement_type" value="cash">cash</option>
        <option  name="reimbursement_type"value="prepaid">prepaid</option>
        <option name="reimbursement_type" value="e-transfer">e-transfer</option>
        <option name="reimbursement_type" value="check">check</option>
      </select> */}
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
          // onChange={changeRequest}
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

      
    
