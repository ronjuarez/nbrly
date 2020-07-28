import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';


export default function MostDeliveries ({
    players,
}) {

    let mostDeliveries = players.sort((a, b) => {
        return b.deliveries - a.deliveries
    })

    return (
        <ul>
          <h1>Most Deliveries</h1>
            {mostDeliveries.slice(1).map((player, index) => <LeaderboardListItem
                position = {index + 2}
                key = {player.id}
                name = {player.name}
                avatar = {player.avatar}
                deliveries = {player.deliveries} />
            )}
        </ul>
    )
}