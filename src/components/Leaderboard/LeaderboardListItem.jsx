import React from 'react';

export default function LeaderboardListItem({
    name,
    position,
    avatar,
    points,
}
) {
    return (
        <li>
            <div>
                <p>{position}</p>
                <img src={avatar}></img>
                <p>{name}</p>
            </div>
            <p>{points}</p>
        </li>
    )
}