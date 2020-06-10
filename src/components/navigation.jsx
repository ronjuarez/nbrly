import React from 'react';
import { NavLink } from 'react-router-dom';
import { faHome, faTrophy, faHandsHelping, faList, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation() {
    const home = <FontAwesomeIcon icon={faHome}/> 
    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 
    const request = <FontAwesomeIcon icon={faHandsHelping}/>
    const task = <FontAwesomeIcon icon={faList}/>
    const profile = <FontAwesomeIcon icon={faUserCircle}/>

    return (
       <div>
            <NavLink to="/">{home}Home</NavLink>  
            <NavLink to="/leaderboard">{leaderboard}Leaderboard</NavLink>
            <NavLink to="/requests">{request}Requests</NavLink>
            <NavLink to="/task">{task}Task</NavLink>
            <NavLink to="/profile">{profile}Profile</NavLink>
       </div>
    );
};