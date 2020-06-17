import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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



export default function Task({
  requests,
  currentUser,
  updateDatabase,
  removeVolunteer
}) {
  console.log('current user', currentUser)
  const onSuccess = () => {
    console.log('Yay! Swipe Success');
  }

  const { id } = useParams();
  console.log(id)
  let index = requests.findIndex(obj => obj.id == id)

  const groceryList = requests && requests.length && requests[index].items.map(item => {

    return (
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

      <NavLink to={`/requests/${id}/complete`}>
        <Button
          variant="success"
          onClick={(event) => updateDatabase(id, currentUser, groceryList)}
        > Completed
      </Button>
      </NavLink>
      < br />
      < br />
      <NavLink to="/requests">
        <Button variant="danger" onClick={() => removeVolunteer(id)}>Cancel</Button>
      </NavLink>



    </Main>
  )


}



