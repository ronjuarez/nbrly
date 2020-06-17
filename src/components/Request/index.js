import React from 'react';
import RequestList from './RequestList';
import Header from './Header'
import styled from 'styled-components';

const ReqMain = styled.div`
  width: 100%;
  overflow: scroll;
 
`
const ReqUl = styled.div`
  overflow:scroll;
  width: 100%;
  height: 700px;
`

export default function Request ({
  requests,
  assignVolunteer,
  currentUser
}) {

  const filterRequestList = requests.filter(request => {  
    
   if (!currentUser.id){
     return (request.volunteer_id === null )
   }  else {
     return(request.volunteer_id === null && request.user_id !== currentUser.id)
    }
  })
  console.log('date', Date.now())
  const list = filterRequestList.map(task => {
    return (
    <RequestList
      id={task.id}
      delivery_address={task.delivery_address}
      complete_by={task.complete_by}
      reimbursement_type ={task.reimbursement_type}
      items={task.items}
      addID={assignVolunteer}
      userID={currentUser.id}
    /> 
    )
  })
  return (
    <ReqMain>
      <Header/>
      <ReqUl>

        {list}
      </ReqUl>
    </ReqMain>
  )

}