import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { 
  useParams,
  NavLink 
} from "react-router-dom";

import ReactSwipeButton from 'react-swipe-button'

const Main = styled.main`
  background: cornflowerblue;
  color: white;
  padding: 20px;
  text-align:center;
  margin: 150px 250px;
  border-radius: 20px;
`
const GroceryUl = styled.ul`
  display:flex;
  flex-direction:column;
`

const GroceryLi = styled.li`
  list-style: none;
  padding: 0.5rem;
  margin-left: 5px;
  span{
    font-weight: bold;
  }
`



export default function Task ({
  requests,
  currentUser
}) {


  const addPoints = (user, numOfItems) => {
 
    let itemsLength = numOfItems.length;
    return (user.points + itemsLength * 100);
  }  
  
  const onSuccess =()=> {
    console.log('Yay! Swipe Success');
  }
  
  const { id } = useParams();

  let index = requests.findIndex(obj => obj.id == id)


  
  
  const groceryList = requests && requests.length && requests[index].items.map(item => {
    return(
      <GroceryLi>
        <ReactSwipeButton 
          text={item}
          color='cornflowerblue'
          onSuccess={onSuccess}
        /> 
        <span>{item}</span>
      
      </GroceryLi>
      
    )
  })

  


  function updateDatabase () {
    Promise.all([ 
    axios.put(`http://localhost:3000/requests/${id}`, {
      volunteer_completed_task: true
    }),
    axios.put(`http://localhost:3000/users/${currentUser.id}`, {
      points: addPoints(currentUser, groceryList)
    })])                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    .then(all => {
      console.log(all);
    })
    .catch(error => {
      console.log(error);
    });
}

  return (
    <Main>
      <h1>Task # {id}</h1>
      <h4>{currentUser.id}</h4>
      <GroceryUl>
        <GroceryLi> 
        Requesters Name:<span> </span>
        </GroceryLi>
  
        <GroceryLi>
          Delivery Address: <p>{requests && requests.length && requests[index].delivery_address}</p>
        </GroceryLi>

        <GroceryLi>
          Grocery List:
          {groceryList}
        </GroceryLi>


      </GroceryUl>
      {/* if you click completed, it will render the task completed page */}
      
      {/* <NavLink to={`/requests/complete`}> */}
      <Button 
        variant="success"
        onClick={updateDatabase}
        > Completed
      </Button>
      {/* </NavLink> */}
      < br />
      < br />
      <NavLink to="/requests">
        <Button variant="danger">Cancel</Button>
      </NavLink>


     
    </Main>
  )


}
 

  
