import React from 'react';
import styled from 'styled-components';

import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LeaderHeader = styled.header`
    background: royalblue;
    justify-content: center;
    margin-bottom: 20px;
    border-radius: 2px;
    padding: 20px;
    color: white;
    height: 25%;
    h1{
        text-align: center;
        margin: 0;
    }
`
const LeaderDiv = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`
const LeaderTrophy = styled.p`
color: gold;
font-size: 45px;

`

const LeaderImg = styled.img`
    border-radius: 100%;
    height: 100px;
    background: powderblue;
`

const LeaderImgContainer = styled.div`
    height: 100%;
    margin: 0 25px;
`

const LeaderPoints = styled.p`
font-size: 45px;
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
             
                
                <LeaderTrophy>{leaderboard}</LeaderTrophy>
                <LeaderImgContainer >
                    <LeaderImg src={avatar}></LeaderImg>
                </LeaderImgContainer>
                
                <LeaderPoints>{points}</LeaderPoints>
            </LeaderDiv> 
        </LeaderHeader>
    )
}
