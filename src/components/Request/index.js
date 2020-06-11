import React from 'react';
import RequestList from './RequestList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";


export default function Request (props) {
  const map = <FontAwesomeIcon icon={faMapMarkedAlt}/> 
  return (
    <main>
      <button>Request Form</button>
      <button>Request List</button>
      <button>{map}</button>
      <h1>Request</h1>
      <RequestList/>

    </main>
     
  )

}