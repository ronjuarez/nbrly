import React from 'react';
import GroceryButton from './GroceryListItem';

export default function GroceryListItem(props) {
    
    return (
        <li> 
            <p>{props.value}</p>
            <GroceryButton/>
        </li>
    )
}