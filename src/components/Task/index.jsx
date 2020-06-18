import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  useParams,
  NavLink

} from "react-router-dom";

import ReactSwipeButton from 'react-swipe-button'

const TaskWrapper = styled.div`
  height: 100%;
  padding: 20px 30px;
  background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(181,181,181,1) 46%, rgba(255,255,255,1) 100%);
`
const Main = styled.div`
  background: cornflowerblue;
  color: white;
  padding: 20px;
  text-align:center;
  /* margin: 10px; */
  border-radius: 20px;
  border: 1px solid white
  
`
const GroceryUl = styled.ul`
  display:flex;
  flex-direction:column;
`

const GroceryLi = styled.li`
  list-style: none;
  padding: 0.5rem;
  /* border: 1px solid blue; */
  /* background: white; */
  span{
    font-weight: bold;
  }
`
const GroceryListItems = styled.li`
  height: 200px;
  /* border: 1px solid blue; */
`



export default function Task({
  requests,
  currentUser,
  updateDatabase,
  removeVolunteer
}) {

  const onSuccess = () => {
    console.log('Yay! Swipe Success');
  }
  console.log(currentUser)
  const { id } = useParams();
  let index = requests.findIndex(obj => obj.id == id)


  const groceryList = requests && requests.length && requests[index].items.map(item => {

    return (

        <ReactSwipeButton
          text={item}
          text_unlocked="picked up"
          // color='cornflowerblue'
          font="black"
          onSuccess={onSuccess}
        />


    )
  })

  return (
    <TaskWrapper>
    <Main>

      <h1>Task # {id}</h1>
      {/* <h4>{currentUser.id}</h4> */}
      <GroceryUl>
        {/* <GroceryLi>
          Requesters Name:<span> </span>
        </GroceryLi> */}

        <GroceryLi>
          Delivery Address: <p>{requests && requests.length && requests[index].delivery_address}</p>
        </GroceryLi>

        <GroceryListItems>
          Grocery List:
          {groceryList}
        </GroceryListItems>


      </GroceryUl>
      {/* if you click completed, it will render the task completed page */}

      <NavLink to={`/requests/${id}/complete`}>
        <Button
          variant="success"
          onClick={() => updateDatabase(id, currentUser, groceryList)}
        > Completed
      </Button>
      </NavLink>
      < br />
      < br />
      <NavLink to="/requests">
        <Button variant="danger" onClick={() => removeVolunteer(id)}>Cancel</Button>
      </NavLink>



    </Main>
    </TaskWrapper>
  )


}



