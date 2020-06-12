import React from 'react';
import AcceptButton from './AcceptButton';
import styled from 'styled-components';
import ReactSwipeButton from 'react-swipe-button'

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


export default function RequestListItem (props) {
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
  const onSuccess =()=> {
    console.log('Yay! Swipe Success');
  }
  
  return (
    <RequestLi>
      <RequestLiDiv>
        <ReactSwipeButton 
          text='SWIPE TO UNLOCK'
          color='#f00'
          onSuccess={onSuccess}
        />
        <h2>{pickup(props.items)}</h2>
        
        <h4>Address: {props.delivery_address}</h4>
        <h4>Date: {props.complete_by}</h4>
        <h4>Reimbursement: {props.reimbursement_type}</h4>
        <h3>{earnedPoints(props.items)} points</h3>
      </RequestLiDiv>
      <AcceptButton id={props.id}/>
    </RequestLi>
  )

}