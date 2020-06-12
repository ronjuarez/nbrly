import React, { useState } from "react";
import "./styles.css"
import GroceryList from "./GroceryList"
export default function Groceries (props) {
  
  const [grocery, setGroceryList] = useState(["5 Peaches", "7 Pinapples","5 Oranges"])

  const [text, setText] = useState("")
    const handleAddItem = event => {
      event.preventDefault();
      console.log(text)
    
      setGroceryList(grocery => [...grocery, text]);
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
        
          <form onSubmit={handleAddItem}>
            <input onChange={event => setText(event.target.value)} type="text" name ="groceryList" value={text}   placeholder="Add a new item"/>
            
            <input   type="submit" value="+" />
          </form>
        
        <h3>Add a new Item</h3>
        
      </div>
    </div>
  )
}