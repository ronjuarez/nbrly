import React, {useState, useEffect} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
import { Link } from "react-router-dom";
import axios from 'axios';


export default function NewRequest (props) {
  const initialState = {
    user_id: 2,
    delivery_address: "",
    items: [],
    reimbursement_type: "",
    volunteer_completed_task: false,
    requester_confirmed_completion: false,
    volunteer_id: "",
  };

  const [request, setRequest] = useState(initialState);
  
  function changeRequest(event) {
    const name = event.target.name;
    const value = event.target.value;
    setRequest(request => ({
        ...request,
        [name]: value
    })) 
  }
  const [value, setValue] = useState(new Date())

  function handleNewRequest(event) {

    axios.post("http://localhost:3000/requests", {
      request: {
        user_id: 2,
        delivery_address: request.delivery_address,
        items:request.items,
        reimbursement_type: request.reimbursement_type,
        complete_by: value,
        volunteer_completed_task: false,
        requester_confirmed_completion: false,
        volunteer_id: ""
      }
    } 
    ).then(response => {
      console.log("updated request", response);
    })
    .catch(error => {
      console.log('oups', error);
    })
    
    event.preventDefault();
  }
    

  
  return(
    <form onSubmit={handleNewRequest}>
      <h1>Form</h1>
      <label>Delivery Address</label>
      <input 
        type="text" 
        name="delivery_address"
        value={request.delivery_address}
        onChange={changeRequest}
        required
        ></input>
      {/* <ReimbursementDropDown  
        onChange={changeRequest}
        onChange={changeRequest}
        value={request.reimbursement_type}
        required
      /> */}
      <select name="reimbursement_type" value={request.reimbursement_type} onChange={changeRequest}  >
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
        onChange={changeRequest}
        value={request.items}
        addItem={(item ) => setRequest(prev => ({...prev, items:[...prev.items, item]}))}
        required
      />
      <button type="submit">
        Submit
      </button>
    </form>
  )
}
