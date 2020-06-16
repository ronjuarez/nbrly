import React, { useEffect } from 'react';
import LeaderboardList from './LeaderboardList';
import Header from './Header';
import styled from 'styled-components';
import Pointsbutton from './PointsButton';
import { NavLink } from 'react-router-dom';

const Main = styled.main`
margin: 10px 30px;
border: 1px solid blue; 
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
            <div>
                <LeaderboardList players = {props.users}/>
            </div>
        </Main>
    )

  
}
