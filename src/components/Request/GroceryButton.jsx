import React from 'react';
const classNames = require('classnames');

export default function GroceryButton(props) {

    return(
        <button className="btn btn-lg btn-outline-danger ml-4" onClick={props.onClick}>Delete</button>
    )
}