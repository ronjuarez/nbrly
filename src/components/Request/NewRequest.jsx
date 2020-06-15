import React, {useState, useEffect} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
import { NavLink } from "react-router-dom";
import axios from 'axios';
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

export default function NewRequest (props) {
  const initialState = {
    user_id: props.currentUser.id,
    items: [],
    delivery_address: "",
    latitude: "",
    longitude: "",
    reimbursement_type: "",
    volunteer_completed_task: false,
    requester_confirmed_completion: false,

  };
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
     libraries 
    })
    

  const [requests, setRequest] = useState(initialState);
  const [value, setValue] = useState(new Date())

  function changeRequest(event) {
    const name = event.target.name;
    const value = event.target.value;
    setRequest(requests => ({
        ...requests,
        [name]: value
    })) 
  }

  
  

  function handleNewRequest(event) {
    axios.post("http://localhost:3000/requests", {
      requests: {
        user_id: props.currentUser.id,
        delivery_address: requests.delivery_address,
        items: requests.items,
        latitude: requests.latitude,
        longitude: requests.longitude,
        reimbursement_type: requests.reimbursement_type,
        complete_by: value,
        volunteer_completed_task: requests.volunteer_completed_task,
        requester_confirmed_completion: requests.requester_confirmed_completion,
      }
    
    } 
    ).then(response => {
      console.log("new request created!", response.data);
    })
    .catch(error => {
      console.log('oups', error);
    })
    event.preventDefault();
    
  }

  function removeItem(id) {
    setRequest(prev => ({...prev, items: prev.items.filter((_, index) => index !== id)}))
  }

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
              setRequest(requests => ({
                ...requests,
                delivery_address: results[0].formatted_address
              }))
              const lat = await getLatLng(results[0])
              const lng = await getLatLng(results[0])
              const latitude = lat.lat;
              const longitude = lng.lng;
              setRequest(requests => ({
                ...requests,
                latitude: latitude,
                longitude: longitude
              }))
        
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
    <form onSubmit={handleNewRequest}>
      <h1>Form</h1>
      <label>Delivery Address</label>
      <Search
      />

    

   
      <select 
        name="reimbursement_type" 
        value={requests.reimbursement_type} 
        onChange={changeRequest}  
      >
        <option name="reimbursement_type" value="cash">cash</option>
        <option  name="reimbursement_type"value="prepaid">prepaid</option>
        <option name="reimbursement_type" value="e-transfer">e-transfer</option>
        <option name="reimbursement_type" value="check">check</option>
      </select>
      <div>
        < br />
        <Calendar
          value={value}
          onChange={setValue}
          required
        />
      </div>
      <Groceries 
        name="items"
        value={requests.items}
        deleteItem={removeItem}
        addItem={(item) => setRequest(prev => ({...prev, items:[...prev.items, item]}))}
        // onChange={changeRequest}
        required
      />
        <button type="submit">
          Submit
        </button>
   
    </form>
  )
}

      
    
