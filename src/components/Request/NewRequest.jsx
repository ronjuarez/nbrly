import React, {useState, useEffect} from 'react';
import ReimbursementDropDown from './Reimbursement';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Groceries from './Groceries'
import { NavLink } from "react-router-dom";

export default function NewRequest ({
  newRequest,
  changeRequest,
  removeItem,
  setDate,
  request,
  addItem,
  requestDate,
}) {

  
  

  return(
    <form onSubmit={newRequest}>
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
      <select 
        name="reimbursement_type" 
        value={request.reimbursement_type} 
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

      
      