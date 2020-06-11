import React from 'react';

export default function LeaderboardListItem(props) {
    return (
        <li>
            <div>
                <p>{props.position}</p>
                <img src={props.avatar}></img>
                <p>{props.name}</p>
            </div>
            <p>{props.points}</p>
        </li>
    )
}