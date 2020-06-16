import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';
import styled from 'styled-components';

const LeaderUL = styled.ul`
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export default function LeaderboardList({
    players,
}) {

    return (
        <LeaderUL>
            {players.slice(1).map((player, index) => <LeaderboardListItem
                position={index + 2}
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                points={player.points} />
            )}
        </LeaderUL>
    )
}