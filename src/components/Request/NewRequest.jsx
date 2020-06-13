import React, {useState, useEffect} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
import { NavLink } from "react-router-dom";
import axios from 'axios';

export default function NewRequest (props) {
  const initialState = {
    user_id: props.currentUser.id,
    items: [],
    delivery_address: "",
    reimbursement_type: "",
    volunteer_completed_task: false,
    requester_confirmed_completion: false,

  };
  
  const [requests, setRequest] = useState(initialState);
  
  function changeRequest(event) {
    const name = event.target.name;
    const value = event.target.value;
    setRequest(requests => ({
        ...requests,
        [name]: value
    })) 
  }

  const [value, setValue] = useState(new Date())
  

  function handleNewRequest(event) {
    axios.post("http://localhost:3000/requests", {
      requests: {
        user_id: props.currentUser.id,
        delivery_address: requests.delivery_address,
        items: requests.items,
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
  
  return(
    <form onSubmit={handleNewRequest}>
      <h1>Form</h1>
      <label>Delivery Address</label>
      <input 
        type="text" 
        name="delivery_address"
        value={requests.delivery_address}
        onChange={changeRequest}
        required
        ></input>
      {/* <ReimbursementDropDown  
        onChange={changeRequest}
        onChange={changeRequest}
        value={request.reimbursement_type}
        required
      /> */}
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

      
      