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
const DeliveriesUL = styled.ul`
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export default function LeaderboardList({
    players,
    mode
}) {

    return (
        mode === "Points" ? 
        <LeaderUL>
            {players.slice(1).map((player, index) => <LeaderboardListItem
                position={index + 2}
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                points={player.points}
                mode={mode} />
            )}
        </LeaderUL> : 
        <DeliveriesUL>
           {players.slice(1).map((player, index) => <LeaderboardListItem
                position={index + 2}
                key={player.id}
                name={player.name}
                avatar={player.avatar}
                deliveries={player.deliveries}
                mode={mode} />
            )} 
        </DeliveriesUL>
    )
}