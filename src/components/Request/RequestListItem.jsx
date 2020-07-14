import React from 'react';
import AcceptButton from './AcceptButton';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';




const RequestLi = styled.li`
  color: white;
  list-style: none;
  background: cornflowerblue;
  padding: 25px;
  border-radius: 40px;
  margin: 10px;
`

const RequestDivWrapper = styled.div`
  display: flex;
    
`

const RequestInfoDiv = styled.div`
  /* display: flex;
  flex-direction: row; */
  padding: 10px;
  p{
    margin: 0;
    font-size: 15px;
  }
  span{
    font-weight: bold;
  }
`


export default function RequestListItem ({
  items,
  delivery_address,
  complete_by,
  reimbursement_type,
  id,
  addID,
  userID
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
        <Alert 
          variant="filled" 
          severity="warning"
          >Urgent!!
        </Alert>
      ) 
    } 
    return 
  }
  
 

  return (
    <RequestLi>
      {isUrgent(complete_by)}
      <RequestDivWrapper>
        <RequestInfoDiv>
          <div><h3>{pickup(items)}</h3></div>
          <div><p><span>Address:</span> {delivery_address}</p></div>
          <div><p><span>Date:</span> <Moment format="MMM Do YYYY" date={complete_by}/></p></div>
          <div><p><span>Reimbursement: </span>{reimbursement_type}</p></div>
          <div><p><span>Points: </span>{earnedPoints(items, complete_by)}</p></div>
        </RequestInfoDiv>
        <AcceptButton 
          id={id} 
          addID={addID}
          userID={userID}
        />
      </RequestDivWrapper>
    </RequestLi>
  )

}