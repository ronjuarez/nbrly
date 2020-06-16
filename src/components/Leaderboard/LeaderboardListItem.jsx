import React from 'react';
import styled from 'styled-components';
import {faMedal, faAward} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListLeaderboard = styled.li`
    background: cornflowerblue;
    color: white;
    display: flex;
    margin-bottom: 10px;
    padding: 20px;
    height: 80px;
    border-radius: 5px;
    align-items: center;
 
`
const Place = styled.h2`
margin: auto;

`
const AvatarImg = styled.img`
border-radius: 100%;
height: 150%;
margin: 0 20px;
`
const RewardPMedal = styled.p`
color: yellow;
font-size: 30px;
margin: 0; 

`
const RewardPRibbon = styled.p`
color: pink;
font-size: 30px;
margin: 0; 
`

const LeaderName = styled.h2`
flex-grow: 3;
text-align: center;
margin: 0;
padding: 10px;
`

export default function LeaderboardListItem({
    name,
    position,
    avatar,
    points,
}) {

    const medals = <FontAwesomeIcon icon={faMedal}/>
    const award = <FontAwesomeIcon icon={faAward}/>  
    const reward = (place) => {
        if (place <= 5) { 
            return (<RewardPMedal>{medals}</RewardPMedal>)
        } else {
            return (<RewardPRibbon>{award}</RewardPRibbon>)
        }
    }

    return (
        <ListLeaderboard>
            <Place>{position}</Place>
            {reward(position)}
            <AvatarImg src={avatar}></AvatarImg>
            <LeaderName>{name}</LeaderName>
            <Place>{points}</Place>
        </ListLeaderboard>
    )
}