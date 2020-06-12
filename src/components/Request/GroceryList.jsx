import React from 'react';
import GroceryButton from './GroceryButton';
const classNames = require('classnames');



export default function GroceryList (props) {
  

  const groceryList = props.grocery.map((item, index) => 
    <li>
      {item}
     <GroceryButton onClick={() => props.onDelete(index)}></GroceryButton> 
  </li>)

  return(
    <ul>
      {groceryList}
      </ul>
  )
}