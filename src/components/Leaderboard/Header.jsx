import React from 'react';
import styled from 'styled-components';
import Pointsbutton from './PointsButton';
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Header(props) {

    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 
    return (
        <header>
            <div>
                <Pointsbutton>Highest Points</Pointsbutton>
                <Pointsbutton>Most Deliveries</Pointsbutton>
            </div>
            <div>
                <div>
                    <p>{leaderboard}</p>
                    <p>{props.name}</p>
                </div>
                <img src={props.avatar}></img>
                <div>
                    <p>#1</p>
                    <p>{props.points}</p>
                </div>
            </div>
        </header>
    )
}
