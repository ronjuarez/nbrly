import React from 'react';
import { NavLink } from 'react-router-dom';
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Image from 'react-bootstrap/Image'
import Moment from 'react-moment';
import moment from 'moment';

const ProfileWrapper = styled.div`

height: 100%;
padding: 20px;
border-radius: 20px; 
`
const HeaderWrapper = styled.header`
display: flex;

`
const UserHWrapper = styled.div`
display: flex;
flex-direction: column;
color: white;
padding: 10px;
`
const AvatarImg = styled.img`
  background: white;
  height: 200px;
  border-radius: 10px;
  
`
const PInnnerWrapper = styled.div`
background: cornflowerblue;
padding: 30px;
border-radius: 20px;
height: 100%;
overflow-y: scroll;
color: white;
`
const CurrentTaskWrapper = styled.div`
background: white;
padding: 10px;
margin: 0;
/* border: cornflowerblue 3px solid; */
border-radius: 20px; 

`
const TaskUL = styled.ul`
  background: cornflowerblue;
  margin: 0;
  padding: 10px;
  color: white;
  border-radius: 20px;
  a{
    text-decoration: none;
    color: white;
  }
`
const TaskOrderNum = styled.li`
text-align: center;
font-size: 30px;
font-weight: bold;
color: lightsalmon;
`

const CRWrapper = styled.div`
 height: 180px;
 overflow: scroll;
  tr{
    color: white;
  }
`
export default function Profile ({
  currentUser,
  requests,
  request,
  confirmRequest,
  handleLogoutClick
}) {

  // Hardcoded Task
  // const task = [
  //   {
  //   id: 4,
  //   delivery_address: "26 Goodwood Park Cres, East York, ON M4C 2G5",
  //   created_at: "2020-06-13T04:42:01.251Z",
  //   updated_at: "2020-06-13T04:42:01.251Z",
  //   volunteer_completed_task: true,
  //   requester_confirmed_completion: true,
  //   user_id: 3,
  //   volunteer_id: null,
  //   items: [
  //   "milk"
  //   ],
  //   complete_by: "2020-06-12T00:00:00.000Z",
  //   reimbursement_type: "cash"
  //   },
  //   {
  //   id: 20,
  //   delivery_address: "70 berry ave.",
  //   created_at: "2020-06-13T20:32:44.040Z",
  //   updated_at: "2020-06-13T20:32:44.040Z",
  //   volunteer_completed_task: false,
  //   requester_confirmed_completion: false,
  //   user_id: 2,
  //   volunteer_id: 14,
  //   items: [
  //   "peaches",
  //   "berries"
  //   ],
  //   complete_by: "2020-06-14T04:00:00.000Z",
  //   reimbursement_type: "cash"
  //   },
  //   {
  //     id: 4,
  //     delivery_address: "26 Goodwood Park Cres, East York, ON M4C 2G5",
  //     created_at: "2020-06-13T04:42:01.251Z",
  //     updated_at: "2020-06-13T04:42:01.251Z",
  //     volunteer_completed_task: true,
  //     requester_confirmed_completion: false,
  //     user_id: 14,
  //     volunteer_id: 2,
  //     items: [
  //     "milk"
  //     ],
  //     complete_by: "2020-06-12T00:00:00.000Z",
  //     reimbursement_type: "cash"
  //     },
  //     {
  //     id: 20,
  //     delivery_address: "70 berry ave.",
  //     created_at: "2020-06-13T20:32:44.040Z",
  //     updated_at: "2020-06-13T20:32:44.040Z",
  //     volunteer_completed_task: false,
  //     requester_confirmed_completion: false,
  //     user_id: 14,
  //     volunteer_id: 2,
  //     items: [
  //     "peaches",
  //     "berries"
  //     ],
  //     complete_by: "2020-06-14T04:00:00.000Z",
  //     reimbursement_type: "cash"
  //     }, 
  //     {
  //       id: 20,
  //       delivery_address: "70 berry ave.",
  //       created_at: "2020-06-13T20:32:44.040Z",
  //       updated_at: "2020-06-13T20:32:44.040Z",
  //       volunteer_completed_task: false,
  //       requester_confirmed_completion: false,
  //       user_id: 14,
  //       volunteer_id: 11,
  //       items: [
  //       "peaches",
  //       "berries"
  //       ],
  //       complete_by: "2020-06-14T04:00:00.000Z",
  //       reimbursement_type: "cash"
  //       },
  //       {
  //         id: 20,
  //         delivery_address: "70 berry ave.",
  //         created_at: "2020-06-13T20:32:44.040Z",
  //         updated_at: "2020-06-13T20:32:44.040Z",
  //         volunteer_completed_task: true,
  //         requester_confirmed_completion: true,
  //         user_id: 14,
  //         volunteer_id: 11,
  //         items: [
  //         "peaches",
  //         "berries"
  //         ],
  //         complete_by: "2020-06-14T04:00:00.000Z",
  //         reimbursement_type: "cash"
  //         }
  // ]
  const thumbsUp = <FontAwesomeIcon icon={faThumbsUp}/> 

  // Check if  the user has any current request 
  const userRequest = requests.filter(request => {
    return (request.user_id === currentUser.id)
  })
  
  // map out current request
  const mapRequest = userRequest.map(request => {
    const mapItems = request.items.map(item => {
      return(
        <ul>
          <li>{item}</li>
        </ul>
      )
    })
    
    function confirmed(userConfirmed) {return (userConfirmed) ? <Alert variant="info"><p>Please Confirm delivery!</p> <Button onClick={(event) => event.preventDefault()}>{thumbsUp}</Button></Alert>: <div><Alert variant="info">Thank you for confirming!</Alert></div>}

    const status = function (volunteer, completion) { 
      if (!volunteer){
        return (
          <Alert variant="primary">not picked up </Alert>
        )
      } else if (volunteer && !completion){
        return (
          <Alert variant='warning' >in progress</Alert>
          )
      } else if (volunteer && completion){ 
        return (
        <div>
          <Alert variant ="success">Completed!</Alert>
          {confirmed(request.requester_confirmed_completion)}
        </div>
        )
      }
    }

    return(
      <tr>
        <td>{request.id}</td>
        <td><Moment format="MMM Do YYYY" date={request.created_at}/></td>
        <td>{status(request.volunteer_id, request.volunteer_completed_task)}</td>
        <td>{mapItems}</td>
      </tr>
      
    )
  })

  // filter through tasks to see if they accepted any pending task
  const userTask = requests.filter(request => {

      return (request.volunteer_id === currentUser.id)
    
  })

  const mapTask = userTask.map(request => {
    const mapItems = request.items.map(item => {
      return(
        <ul>
          <li>{item}</li>
        </ul>
      )
    })

    return(
      <NavLink to={`/requests/${request.id}`}>
          <TaskOrderNum>Request order#: {request.id}</TaskOrderNum>
          <li>delivery_address: {request.delivery_address}</li>
          <li>complete by: {request.created_at}</li>
          <li>reimbursement type:{request.reimbursement_type}</li>
          <li>items:{mapItems}</li>
      </NavLink>
      
      
    )
  })




  return (
    <ProfileWrapper>
      <PInnnerWrapper>
      {/* <h1>Profile {currentUser.id}</h1> */}
      <HeaderWrapper>
        <AvatarImg src={currentUser.avatar}/>
        <UserHWrapper>
          <h2>Hello, {currentUser.name}</h2>
        <h2>
          Current Points: <span>{currentUser.points}</span>
        </h2>
        <button onClick={() => handleLogoutClick()}>Logout</button>
        </UserHWrapper>
      </HeaderWrapper>
    
      <div>
        <div>
          
        </div>
        <div>
          <h2>
            Current Task 
          </h2>
          <CurrentTaskWrapper>
            <TaskUL>
              {mapTask}
            </TaskUL>
              
          </CurrentTaskWrapper>
        </div>
        <div>
          <h4>
            Request History
          </h4>
          <CRWrapper>
            <Table size="xs">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {mapRequest}
            </tbody>
            </Table>
          </CRWrapper>
          
        </div>
      </div>
      </PInnnerWrapper>
    </ProfileWrapper>
  )
}