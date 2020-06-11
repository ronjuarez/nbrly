import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';

export default function LeaderboardList(props) {

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
    },

]
    return (
        <ul>
            {props.players.slice(1).map((player, index) => <LeaderboardListItem
                position = {index + 2}
                name = {player.name}
                avatar = {player.avatar}
                points = {player.points} />
            )}
        </ul>
    )
}