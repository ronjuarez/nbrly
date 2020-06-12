import React from 'react';
import AcceptButton from './AcceptButton';
import styled from 'styled-components';


const RequestLi = styled.li`
  color: white;
  background: cornflowerblue;
  list-style:none;
  padding: 20px;
  border-radius: 40px;
  display:u flex;
  margin: 20px;
`
const RequestLiDiv = styled.div`
padding: 20px;
`


export default function RequestListItem ({
  items,
  delivery_address,
  complete_by,
  reimbursement_type,
  id,
}) {
  // console.log("items", props.items.length)

  const pickup = (requestData) => {
    let itemsLength = requestData.length;
    if (itemsLength < 5) {
      return "Small Pickup"
    } else if (5 < itemsLength < 10) {
      return "Medium Pickup"
    } else {
      return "Large Pickup"
    }
  }
  
  const earnedPoints = (requestData) => {
    let itemsLength = requestData.length;
    // if satement checking date completed by is under 24 hours then add an extra 100 points
    return (itemsLength * 100);
    
  }

  // if date for complete by is under 24 hours then show an urgent stick next to teh pickup
  
  
  return (
    <RequestLi>
      <RequestLiDiv>
        <h2>{pickup(items)}</h2>
        <h4>Address: {delivery_address}</h4>
        <h4>Date: {complete_by}</h4>
        <h4>Reimbursement: {reimbursement_type}</h4>
        <h3>{earnedPoints(items)} points</h3>
      </RequestLiDiv>
      <AcceptButton id={id}/>
    </RequestLi>
  )

}