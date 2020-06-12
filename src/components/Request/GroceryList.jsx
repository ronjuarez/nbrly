import React from 'react';




export default function GroceryList (props) {


  const groceryList = props.grocery.map(item => 
    <li>
      {item}
    
    </li>)

  return(
    <ul>
      {groceryList}
      </ul>
  )
}