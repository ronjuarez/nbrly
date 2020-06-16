import React from 'react';
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'

const RequestHeader = styled.div`
  padding: 10px 20px;
  margin: 20px 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
`

export default function Header(){
  const map = <FontAwesomeIcon icon={faMapMarkedAlt}/>



  return (
    <RequestHeader>
      <NavLink to ="/requests/new" >
        <Button variant="outline-primary">Request Form</Button>
      </NavLink>
      <NavLink to ="/requests">
        <Button variant="outline-primary">Request List</Button>
      </NavLink>
      <NavLink to ="/">
        <Button variant="outline-primary">{map}</Button>
      </NavLink>
    </RequestHeader>
  )


}