import React from 'react';
import AcceptButton from './AcceptButton';
import styled from 'styled-components';


const RequestLi = styled.li`
  color: white;
  background: cornflowerblue;
  list-style:none;
  padding: 20px;
  border-radius: 40px;
  display: flex;
  margin: 20px;
`
const RequestLiDiv = styled.div`
padding: 20px;
`


export default function RequestListItem (props) {
  const requestData = {
    delivery_address: "500 Kingston Rd, Toronto, ON M4L 1V3",
    reimbursement_type: "cash",
    complete_by: "2020-06-15",
    items: [
      "milk",
      "sugar",
      "eggs"
      ],
  }
  const pickup = (requestData) => {
    let itemsLength = requestData.items.length;
    if (itemsLength < 5) {
      return "Small Pickup"
    } else if (5 < itemsLength < 10) {
      return "Medium Pickup"
    } else {
      return "Large Pickup"
    }
  }

  const earnedPoints = (requestData) => {
    let itemsLength = requestData.items.length;
    return itemsLength * 100
  }

  
  return (
    <RequestLi>
      <RequestLiDiv>
        <h2>{pickup(requestData)}</h2>
        
        <h4>Address: {requestData.delivery_address}</h4>
        <h4>Date: {requestData.complete_by}</h4>
        <h4>Reimbursement: {requestData.reimbursement_type}</h4>
        <h3>{earnedPoints(requestData)} points</h3>
      </RequestLiDiv>
      <AcceptButton/>
    </RequestLi>
  )

}