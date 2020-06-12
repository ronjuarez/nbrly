import React from 'react';
import RequestListItem from './RequestListItem';
  

export default function RequestList (props) {
  
return(
    <ul> 
      <RequestListItem 
      id={props.id}
      delivery_address={props.delivery_address}
      complete_by={props.complete_by}
      reimbursement_type={props.reimbursement_type}
      items={props.items}
      />
    </ul>
  )
}