import React, { useState } from "react";
import {Grid, Input, Button, List, ListItem, ListItemText, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import styled from 'styled-components';

const StyledList = styled(List)`
margin-top: 10px;
height: 200px;
overflow-y: scroll;
/* background: cornflowerblue; */
color: grey;
font-size: 20px;
background: azure;
`
const NewItem = styled.li`
  /* border: red 1px solid; */
  display: flex;
  padding: 5px 10px;

  &:hover {
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.50);
  }
`


const ButtonWrapper = styled.div`
margin-left: auto;
`

export default function Groceries ({
  addItem,
  deleteItem,
}) {

  const [grocery, setGroceryList] = useState([])

  const [text, setText] = useState("")
  const handleAddItem = event => {
    event.preventDefault();
    
    setGroceryList(grocery => [...grocery, text]);
    addItem(text)
    setText("")
  }
  
  function removeGroceryItem(id) {
    deleteItem(id);
    setGroceryList(grocery => grocery.filter((_, index) => index !== id))
  }


  const groceryList = grocery.map((item, index) => 
  
      <NewItem>
          {item}
        <ButtonWrapper>
          <Button 
          // className={classes.button}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={()=> removeGroceryItem(index)}
        >
          Delete
        </Button>
        </ButtonWrapper>
      </NewItem>
  )

  return (
      <div>
      <h5>Grocery List:</h5>
      <form >
          <Input 
          
            onChange={event => setText(event.target.value)} 
            type="text" 
            name ="groceryList" 
            value={text}   
            placeholder="Add a new item"
            required 
            />

          <Button 
            type="button"
            onClick={handleAddItem}>
              <AddCircleOutlineIcon color="primary"
              />
          </Button>
        </form>
        <StyledList>
          {groceryList}
        </StyledList>
      </div>

  )
}