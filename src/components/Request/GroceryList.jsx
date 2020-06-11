import React from 'react';
import GroceryListItem from './GroceryListItem';



export default function GroceryList (props) {
  // const removeItem () {
  //   let newGroceries= [...grocery, ];

  //   let filtered = newGroceries.filter()

  //
  const handleDeletedItem = props.grocery.map(item => <GroceryListItem
    value = {item}/>
  )


  return(
    <ul>
      {handleDeletedItem}
    </ul>
  )
}