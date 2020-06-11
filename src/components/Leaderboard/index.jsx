import React, { useEffect } from 'react';
import LeaderboardList from './LeaderboardList';
import Header from './Header';

export default function Leaderboard (props) {

    const players = [
        {
        "id":10,
        "name":"Quinton Buckridge",
        "email":"emerson@carroll.co",
        "password_digest":"password",
        "points":90,
        "created_at":"2020-06-10T16:42:29.915Z",
        "updated_at":"2020-06-10T16:42:29.915Z",
        "avatar":"https://robohash.org/fugitquidolores.png?size=300x300\u0026set=set1"
    },
    {
        "id":9,
        "name":"Quinton Buckridge",
        "email":"emerson@carroll.co",
        "password_digest":"password",
        "points":100,
        "created_at":"2020-06-10T16:42:29.915Z",
        "updated_at":"2020-06-10T16:42:29.915Z",
        "avatar":"https://robohash.org/fugitquidolores.png?size=300x300\u0026set=set1"
    },
    {
        "id":9,
        "name":"Quinton Buckridge",
        "email":"emerson@carroll.co",
        "password_digest":"password",
        "points":100,
        "created_at":"2020-06-10T16:42:29.915Z",
        "updated_at":"2020-06-10T16:42:29.915Z",
        "avatar":"https://robohash.org/fugitquidolores.png?size=300x300\u0026set=set1"
    },]
  
    return (
        <div>
            <Header
                name = {players[0].name}
                avatar = {players[0].avatar}
                points = {players[0].points}/>
            <div>
                <LeaderboardList players = {players}/>
            </div>
        </div>
    )

  
}
