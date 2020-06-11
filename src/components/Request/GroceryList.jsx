import React from 'react';
const classNames = require('classnames');



export default function GroceryList (props) {


  const groceryList = props.grocery.map(item => 
    <li>
      {item}
      <button className="btn btn-lg btn-outline-danger ml-4">Delete</button>
    </li>)

  return(
    <ul>
      {groceryList}
      </ul>
  )
}