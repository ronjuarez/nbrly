import React from 'react';
import styled from 'styled-components';

import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LeaderHeader = styled.header`
background: silver;
justify-content: center;
margin-bottom: 20px;
border-radius: 2px;
padding: 20px;
color: white;
`
const LeaderDiv = styled.div`
display:flex;
flex-direction: row;


`
const LeaderTrophy = styled.p`
color: orange;
font-size: 100px;

`

const LeaderImg = styled.img`
border-radius: 100%;
margin: auto;
`
export default function Header({
  name,
  avatar,
  points  
}) {

    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 

    return (
        <LeaderHeader>
            <h1>{name}</h1>
            <LeaderDiv>
             
                <h2>#1</h2>
                <LeaderTrophy>{leaderboard}</LeaderTrophy>
                <LeaderImg src={avatar}></LeaderImg>
                
                <p>{points}</p>
            </LeaderDiv> 
        </LeaderHeader>
    )
}
