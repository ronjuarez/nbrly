import React from 'react';
import GroceryButton from './GroceryButton';
const classNames = require('classnames');



export default function GroceryList (props) {
  

  const groceryList = props.grocery.map((item, index) => 
    <li>
      {item}
      <button className="btn btn-lg btn-outline-danger ml-4" onClick={()=> props.onDelete(index)}>Delete</button>
  </li>)

  return(
    <ul>
      {groceryList}
      </ul>
  )
}