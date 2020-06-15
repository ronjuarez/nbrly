import React from 'react';
import AcceptButton from './AcceptButton';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';




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
  currentUser
}) {

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
  console.log()
  const earnedPoints = (requestData, completedDate) => {
    let itemsLength = requestData.length;
    let currentDate = new Date()
    // if satement checking date completed by is under 24 hours then add an extra 100 points
    if ( (moment(completedDate).diff(moment(currentDate), 'hours')) < 24) {
      return ((itemsLength * 100) * 2)
    } else {
      return (itemsLength * 100);
    }


  }

  // if date for complete by is under 24 hours then show an urgent stick next to teh pickup
  const isUrgent = (completedDate) => {
    let currentDate = new Date()
    if ( (moment(completedDate).diff(moment(currentDate), 'hours')) < 24 ) { 
      return (
        <Alert variant="filled" severity="warning">Urgent!!</Alert>
      ) 
    } 
    return 
  }
  
 
  isUrgent(complete_by)
  return (
    <RequestLi>
      <RequestLiDiv>
        <h3>
          {isUrgent(complete_by)}
        </h3>
        <h2>{pickup(items)}</h2>
        <h4>Address: {delivery_address}</h4>
        <h4>Date: <Moment format="MMM Do YYYY" date={complete_by}/>
        </h4>
        <h4>Reimbursement: {reimbursement_type}</h4>
        <h3>{earnedPoints(items, complete_by)} points</h3>
      </RequestLiDiv>
      <AcceptButton 
        id={id} 
        currentUser={currentUser}
      />
    </RequestLi>
  )

}