import React from 'react';
import { NavLink } from 'react-router-dom';
import { faHome, faTrophy, faHandsHelping, faList, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from 'styled-components';

const activeClassName = 'nav-item-active'
const StyledLink = styled(NavLink).attrs({ activeClassName })`
    margin-right: 20px;
    color: grey;
    text-decoration: none;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &.${activeClassName} {
        color: red;
        border: 2px dotted black;
        padding: 20px;
        border-radius: 20px;
    }
`
const NavUL = styled.ul`
display: flex;
flex-direction:row;
`


const NavSpan = styled.span`
font-size: 10px;`

export default function Navigation() {
    const home = <FontAwesomeIcon icon={faHome}/> 
    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 
    const request = <FontAwesomeIcon icon={faHandsHelping}/>
    const task = <FontAwesomeIcon icon={faList}/>
    const profile = <FontAwesomeIcon icon={faUserCircle}/>
    
    return (
       <NavUL>
            <StyledLink exact to="/">{home}<NavSpan>Home</NavSpan></StyledLink>  
            <StyledLink to="/leaderboard">{leaderboard}<NavSpan>Leaderboard</NavSpan></StyledLink>
            <StyledLink to="/requests">{request}<NavSpan>Requests</NavSpan></StyledLink>
            <StyledLink to="/requests/:id">{task}<NavSpan>Task</NavSpan></StyledLink>
            <StyledLink to="/profile">{profile}<NavSpan>Profile</NavSpan></StyledLink>
       </NavUL>
    );
};