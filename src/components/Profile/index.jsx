import React from 'react';
import { NavLink } from 'react-router-dom';
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'


export default function Profile ({
  currentUser,
  requests,
  request,
  confirmRequest,
  handleLogoutClick
}) {

  // Hardcoded Task
  const task = [
    {
    id: 4,
    delivery_address: "26 Goodwood Park Cres, East York, ON M4C 2G5",
    created_at: "2020-06-13T04:42:01.251Z",
    updated_at: "2020-06-13T04:42:01.251Z",
    volunteer_completed_task: true,
    requester_confirmed_completion: true,
    user_id: 3,
    volunteer_id: null,
    items: [
    "milk"
    ],
    complete_by: "2020-06-12T00:00:00.000Z",
    reimbursement_type: "cash"
    },
    {
    id: 20,
    delivery_address: "70 berry ave.",
    created_at: "2020-06-13T20:32:44.040Z",
    updated_at: "2020-06-13T20:32:44.040Z",
    volunteer_completed_task: false,
    requester_confirmed_completion: false,
    user_id: 2,
    volunteer_id: 14,
    items: [
    "peaches",
    "berries"
    ],
    complete_by: "2020-06-14T04:00:00.000Z",
    reimbursement_type: "cash"
    },
    {
      id: 4,
      delivery_address: "26 Goodwood Park Cres, East York, ON M4C 2G5",
      created_at: "2020-06-13T04:42:01.251Z",
      updated_at: "2020-06-13T04:42:01.251Z",
      volunteer_completed_task: true,
      requester_confirmed_completion: false,
      user_id: 14,
      volunteer_id: 2,
      items: [
      "milk"
      ],
      complete_by: "2020-06-12T00:00:00.000Z",
      reimbursement_type: "cash"
      },
      {
      id: 20,
      delivery_address: "70 berry ave.",
      created_at: "2020-06-13T20:32:44.040Z",
      updated_at: "2020-06-13T20:32:44.040Z",
      volunteer_completed_task: false,
      requester_confirmed_completion: false,
      user_id: 14,
      volunteer_id: 2,
      items: [
      "peaches",
      "berries"
      ],
      complete_by: "2020-06-14T04:00:00.000Z",
      reimbursement_type: "cash"
      }, 
      {
        id: 20,
        delivery_address: "70 berry ave.",
        created_at: "2020-06-13T20:32:44.040Z",
        updated_at: "2020-06-13T20:32:44.040Z",
        volunteer_completed_task: false,
        requester_confirmed_completion: false,
        user_id: 14,
        volunteer_id: 11,
        items: [
        "peaches",
        "berries"
        ],
        complete_by: "2020-06-14T04:00:00.000Z",
        reimbursement_type: "cash"
        },
        {
          id: 20,
          delivery_address: "70 berry ave.",
          created_at: "2020-06-13T20:32:44.040Z",
          updated_at: "2020-06-13T20:32:44.040Z",
          volunteer_completed_task: true,
          requester_confirmed_completion: true,
          user_id: 14,
          volunteer_id: 11,
          items: [
          "peaches",
          "berries"
          ],
          complete_by: "2020-06-14T04:00:00.000Z",
          reimbursement_type: "cash"
          }
  ]
  


  const thumbsUp = <FontAwesomeIcon icon={faThumbsUp}/> 

  // Check if  the user has any current request 
  const userRequest = task.filter(request => {
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
      <ul>
        <li>Request order#:{request.id}</li>
        <li>status: {status(request.volunteer_id, request.volunteer_completed_task)}</li>
        <li>delivery_address: {request.delivery_address}</li>
        <li>created at: {request.created_at}</li>
        <li>reimbursement type: {request.reimbursement_type}</li>
        
        <li>items:{mapItems}</li>
      </ul>
      
    )
  })

  // filter through tasks to see if they accepted any pending task
  const userTask = task.filter(request => {
    return (request.volunteer_id == currentUser.id)
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
          <li>Request order#:{request.id}</li>
          <li>delivery_address: {request.delivery_address}</li>
          <li>complete by: {request.created_at}</li>
          <li>reimbursement type:{request.reimbursement_type}</li>
          <li>items:{mapItems}</li>
      </NavLink>
      
      
    )
  })




  return (
    <main>
      <h1>Profile {currentUser.id}</h1>
      <header>
        <Image src={currentUser.avatar} thumbnail></Image>
        <h2>Hello, {currentUser.email}</h2>
      </header>
    
      <div>
        <div>
          <h2>
            Current Points: <span>{currentUser.points}</span>
          </h2>
        </div>
        <div>
          <h2>
            Current Task 
          </h2>
          <div>
            <ul>
              {mapTask}
            </ul>
            
          </div>
        </div>
        <div>
          <h2>
            Current Request
          </h2>
          <div>
            {mapRequest}
          </div>
          <button onClick={() => handleLogoutClick()}>Logout</button>
        </div>
      </div>
      
    </main>
  )
}