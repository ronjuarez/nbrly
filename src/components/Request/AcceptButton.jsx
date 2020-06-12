import React from "react";
// const classnames = require('classnames');
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

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

export default function AcceptButton ({
  id
}) {
  // console.log('props', props.id)
  return(
    <NavLink to={`/requests/${id}`}>
      <Acceptbutton>
        Accept
      </Acceptbutton>
    </NavLink>
  )
}