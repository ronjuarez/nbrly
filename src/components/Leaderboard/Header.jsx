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
const ModeDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items:center;
`
const PointsButton = styled.button`
    border-radius: 5px;
    margin-bottom: 25px;
    background: linear-gradient(90deg, rgba(237,98,37,1) 0%, rgba(238,166,15,1) 35%, rgba(237,181,15,1) 100%);
    font-weight: bold;
    border: 1px solid;
    
`
const DeliveriesButton = styled.button`
    border-radius: 5px;
    margin-bottom: 25px;
    background: linear-gradient(90deg, rgba(237,98,37,1) 0%, rgba(238,166,15,1) 35%, rgba(237,181,15,1) 100%);
    font-weight: bold; 
    border: 1px solid; 
`
const LeaderTrophy = styled.p`
color: gold;
font-size: 45px;

`
const LeaderDeliveries = styled.p`
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
  points,
  mode,
  deliveries,
  changeMode  
}) {
    const POINTS = "Points";
    const DELIVERIES = "Deliveries";
    const leaderboard = <FontAwesomeIcon icon={faTrophy}/> 

    return (
        <LeaderHeader>
            <h1>{name}</h1>
            <LeaderDiv>
             
                {/* <h2>#1</h2> */}
                <LeaderTrophy>{leaderboard}</LeaderTrophy>
                <LeaderImgContainer >
                    <LeaderImg src={avatar}></LeaderImg>
                </LeaderImgContainer>
                {mode === "Points" ?
                <LeaderPoints>{points}</LeaderPoints> :
                <LeaderDeliveries>{deliveries}</LeaderDeliveries>}
            </LeaderDiv> 
            <ModeDiv>
                <PointsButton onClick={() => changeMode(POINTS)}> 
                    Most Points
                </PointsButton>
                <DeliveriesButton onClick={() => changeMode(DELIVERIES)}>
                    Most Deliveries
                </DeliveriesButton>
            </ModeDiv>
        </LeaderHeader>
    )
}
