import React from 'react';
import RequestList from './RequestList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";


export default function Request (props) {
  const map = <FontAwesomeIcon icon={faMapMarkedAlt}/> 

  const list = props.requests && props.requests.length && props.requests.map(task => {

    return (
    <RequestList
      id={task.id}
      delivery_address={task.delivery_address}
      complete_by={task.complete_by}
      reimbursement_type ={task.reimbursement_type}
      items={task.items}
    /> 
    )
  })
  return (
    <main>
      <button>Request Form</button>
      <button>Request List</button>
      <button>{map}</button>
      <h1>Request</h1>
      {list}

    </main>
     
  )

}