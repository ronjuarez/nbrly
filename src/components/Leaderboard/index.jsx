import React, { useEffect } from 'react';
import LeaderboardList from './LeaderboardList';
import Header from './Header';
import styled from 'styled-components';
import Pointsbutton from './PointsButton';
import { NavLink } from 'react-router-dom';
import MostDeliveries from './MostDeliveries';


const Main = styled.div`
    margin: 0;
    /* border: 2px solid blue;  */
    height: 100%;
    background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(181,181,181,1) 46%, rgba(255,255,255,1) 100%);


`
const LeaderboardContainer = styled.div`
    height: 70%;
`

export default function Leaderboard (props) {
    console.log(props.users)
    let newLeaderboard = props.users.sort((a,b) => {
        return b.points - a.points
    })

    let deliveryLeaderboard = props.users.sort((a, b) => {
        return b.deliveries - a.deliveries
    })
    console.log(deliveryLeaderboard)
    
    return (
        
        <Main>           
            {props.mode === "Points" ? 
            <Header
                changeMode={props.changeMode}
                mode = {props.mode}
                name = {newLeaderboard && newLeaderboard.length && newLeaderboard[0].name}
                avatar = {newLeaderboard && newLeaderboard.length && newLeaderboard[0].avatar}
                points = {newLeaderboard && newLeaderboard.length && newLeaderboard[0].points}/> : 
            <Header 
                changeMode={props.changeMode}
                mode = {props.mode}
                name = {deliveryLeaderboard && deliveryLeaderboard.length && deliveryLeaderboard[0].name}
                avatar = {deliveryLeaderboard && deliveryLeaderboard.length && deliveryLeaderboard[0].avatar}
                deliveries = {deliveryLeaderboard && deliveryLeaderboard.length && deliveryLeaderboard[0].deliveries}
                />}

            {props.mode === "Points" ? 
            <LeaderboardContainer>
                <LeaderboardList 
                mode= {props.mode}
                players = {newLeaderboard}/>
            </LeaderboardContainer> : 
            <LeaderboardContainer>
                <LeaderboardList 
                mode ={props.mode}
                players = {deliveryLeaderboard}/>
            </LeaderboardContainer>}
        </Main>
    )

  
}
