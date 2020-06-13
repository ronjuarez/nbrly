import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';

export default function LeaderboardList({
    players,
}) {

    return (
        <ul>
            {players.slice(1).map((player, index) => <LeaderboardListItem
                position={index + 2}
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                points={player.points} />
            )}
        </ul>
    )
}