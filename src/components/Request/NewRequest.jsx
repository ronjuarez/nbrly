import React, {useState, useEffect} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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
              setDeliveryAddress(results[0].formatted_address)
              const coords = await getLatLng(results[0])
              setCoords(coords.lat, coords.lng)
        
            } catch(error) {
              console.log(error)
            }
          }}>
        <ComboboxInput
        value={value} 
        onChange={(e) => {setValue(e.target.value)}}
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
   



  return(
    <form onSubmit={newRequest}>
      <h1>Form</h1>
      <label>Delivery Address</label>
      <Search
      />

    

      <select 
        name="reimbursement_type" 
        value={request.reimbursement_type} 
        onChange={changeRequest}  
      > 
        <option selected name="reimbursement_type" value="">choose one</option>
        <option name="reimbursement_type" value="cash">cash</option>
        <option  name="reimbursement_type"value="prepaid">prepaid</option>
        <option name="reimbursement_type" value="e-transfer">e-transfer</option>
        <option name="reimbursement_type" value="check">check</option>
      </select>
      <div>
        < br />
        <Calendar
          value={requestDate}
          onChange={setDate}
          required
        />
      </div>
      <Groceries 
        name="items"
        value={request.items}
        deleteItem={removeItem}
        addItem={addItem}
        // onChange={changeRequest}
        required
      />
        <button type="submit">
          Submit
        </button>
   
    </form>
  )
}

      
    
