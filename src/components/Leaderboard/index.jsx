import React, { useEffect } from 'react';
import LeaderboardList from './LeaderboardList';
import Header from './Header';

export default function Leaderboard (props) {

    return (
        
        <div>
            
            <Header
                name = {props.users && props.users.length && props.users[0].name}
                avatar = {props.users && props.users.length && props.users[0].avatar}
                points = {props.users && props.users.length && props.users[0].points}/>
            <div>
                <LeaderboardList players = {props.users}/>
            </div>
        </div>
    )

  
}
