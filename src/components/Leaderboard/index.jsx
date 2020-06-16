import React, { useEffect } from 'react';
import LeaderboardList from './LeaderboardList';
import Header from './Header';
import styled from 'styled-components';
import Pointsbutton from './PointsButton';
import { NavLink } from 'react-router-dom';

const Main = styled.div`
    margin: 0;
    /* border: 2px solid blue;  */
    height: 100%;

`
const LeaderboardContainer = styled.div`
    height: 70%;
`

export default function Leaderboard (props) {

    return (
        
        <Main>           
            {/* <div>
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
            </div> */}
            <Header
                name = {props.users && props.users.length && props.users[0].name}
                avatar = {props.users && props.users.length && props.users[0].avatar}
                points = {props.users && props.users.length && props.users[0].points}/>
            <LeaderboardContainer>
                <LeaderboardList players = {props.users}/>
            </LeaderboardContainer>
        </Main>
    )

  
}
