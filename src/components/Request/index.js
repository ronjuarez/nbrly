import React from 'react';
import RequestList from './RequestList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
// import NewRequest from "./NewRequest"
import { NavLink } from "react-router-dom"


export default function Request ({
  requests,
  currentUser
}) {
  const map = <FontAwesomeIcon icon={faMapMarkedAlt}/> 
  
  const list = requests && requests.length && requests.map(task => {
   
    return (
    <RequestList
      id={task.id}
      delivery_address={task.delivery_address}
      complete_by={task.complete_by}
      reimbursement_type ={task.reimbursement_type}
      items={task.items}
      currentUser={currentUser.id}
    /> 
    )
  })
  return (
    <main>
      <NavLink to ="/requests/new" >
        <button>Request Form</button>
      </NavLink>
      <NavLink to ="/requests">
        <button>Request List</button>
      </NavLink>
      <button>{map}</button>
      <h1>Request</h1>
      {list}

    </main>
    
  )

}