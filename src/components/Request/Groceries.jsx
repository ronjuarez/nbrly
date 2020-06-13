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
    props.deleteItem(id);
    setGroceryList(grocery => grocery.filter((_, index) => index !== id))
  }


  const groceryList = grocery.map((item, index) => 
    <li>
      {item}
      <button className="btn btn-lg btn-outline-danger ml-4" onClick={()=> removeGroceryItem(index)}>Delete</button>
  </li>)

  return (
    <div>
      <h1>Grocery List</h1>
      <div>
        <ul>
          {groceryList}
        </ul>
       
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