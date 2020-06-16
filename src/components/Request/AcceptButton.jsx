import React from "react";
// const classnames = require('classnames');
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Acceptbutton = styled.button` 
  font-size: 20px; 
  background:lightsalmon;
  border-radius: 10px;
  border: 3px solid grey;
  color: dimgrey;
  margin-left: auto;
  padding: 20px;
  width: 200px;
  margin: auto;


`
const StyledNavLink = styled(NavLink)`
  margin: auto;
`


export default function AcceptButton ({
  id,
  addID,
  userID
}) {
  
  return(
    <StyledNavLink to={`/requests/${id}`}>
      <Acceptbutton onClick={addID(id, userID)} >
        Accept
      </Acceptbutton>
    </StyledNavLink>
  )
}