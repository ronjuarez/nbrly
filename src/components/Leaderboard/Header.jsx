import React from 'react';
import styled from 'styled-components';
import Pointsbutton from './PointsButton';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';


export default function Header({
  name,
  avatar,
  points  
}) {

    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 

    return (
        <header>
            <div>
                <NavLink to ="/leaderboard">
                    <Pointsbutton>
                        Highest Points
                    </Pointsbutton>
                </NavLink>
                <NavLink to="leaderboard/mostdeliveries">
                    <Pointsbutton>
                        Most Deliveries
                    </Pointsbutton>
                </NavLink>
            </div>
            <div>
                <div>
                    <p>{leaderboard}</p>
                    <p>{name}</p>
                </div>
                <img src={avatar}></img>
                <div>
                    <p>#1</p>
                    <p>{points}</p>
                </div>
            </div>
        </header>
    )
}
