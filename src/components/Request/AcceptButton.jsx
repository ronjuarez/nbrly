import React from "react";
// const classnames = require('classnames');
import styled from 'styled-components';


const Acceptbutton = styled.button` 
font-size: 20px; 
background:peachpuff;
border-radius: 10px;
border: 3px solid grey;
color: darkgrey;
margin: 20px;
margin-left: auto;
padding: 50px;
width: 200px;


`

export default function AcceptButton (props) {
  
  return(
    <Acceptbutton  >
      Accept
    
    </Acceptbutton>
  )
}