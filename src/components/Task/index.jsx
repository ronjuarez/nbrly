import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskCompleted from './taskCompleted';
import { 
  useParams 
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
  requests
}) {
  const onSuccess =()=> {
    console.log('Yay! Swipe Success');
  }
  const { id } = useParams();
  console.log(requests)

  const groceryList = requests && requests.length && requests[id].items.map(item => {
    return(
      <GroceryLi>
        <ReactSwipeButton 
          text='SWIPE TO UNLOCK'
          color='#f00'
          onSuccess={onSuccess}
        />
        <span>{item}</span>
        <input type="checkbox" label="Check me out" />
      
      </GroceryLi>
      
    )
  })
  
  
  return (
    <Main>
      <h1>Task # {id}</h1>
      <GroceryUl>
        <GroceryLi> 
        Requesters Name:<span> </span>
        </GroceryLi>
  
        <GroceryLi>
          Delivery Address: <p>{requests && requests.length && requests[id].delivery_address}</p>
        </GroceryLi>

        <GroceryLi>
          Grocery List:
          {groceryList}
        </GroceryLi>


      </GroceryUl>
      {/* if you click completed, it will render the task completed page */}
      <Button variant="success">Completed</Button>
      < br />
      < br />
      <Button variant="danger">Cancel</Button>



     
    </Main>
  )


}
 

  
