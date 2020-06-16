import React, { useState } from "react";
import {Grid, Input, Button, List, ListItem, ListItemText, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


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
  
      <ListItem 
      alignItems="flex-start">
        <ListItemText>
          {item}
        </ListItemText>
        
        <Box 
        ml="auto"
        >
          <Button 
          
          
          // className={classes.button}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={()=> removeGroceryItem(index)}
        >
          Delete
        </Button>
        </Box>
        
      </ListItem>
  )

  return (
    <Grid 
      style={{border:"1px solid blue"}}
      container
      direction="column"
      justify="center"
      alignItems="center"
      >
      <Grid 
      list>
          <h5 style={{border:"1px solid blue"}}>Grocery List</h5>
      </Grid>
      <Grid>
        <List>
          {groceryList}
        </List>

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
      </Grid>
    </Grid>
  )
}