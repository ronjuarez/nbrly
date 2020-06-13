import React, { useState } from "react";
import "./styles.css"
import GroceryList from "./GroceryList"

export default function Groceries (props) {
  
  const [grocery, setGroceryList] = useState([])

  const [text, setText] = useState("")
    const handleAddItem = event => {
      event.preventDefault();
    
    setGroceryList(grocery => [...grocery, text]);
    props.addItem(text)
    setText("")
  }

  function removeGroceryItem(id) {
    setGroceryList(grocery => grocery.filter((_, index) => index !== id))
  }

  return (
    <div>
      <h1>Grocery List</h1>
      <div>
        <GroceryList 
          grocery={grocery}
          onDelete ={removeGroceryItem}/>
        
          <form >
            <input 
            onChange={event => setText(event.target.value)} 
            type="text" 
            name ="groceryList" 
            value={text}   
            placeholder="Add a new item"/>
            <button type="button" onClick={handleAddItem}>+</button>
           
          </form>

        
      </div>
    </div>
  )
}