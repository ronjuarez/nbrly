import React from 'react';
import styled from 'styled-components';
import {faMedal, faAward} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListLeaderboard = styled.li`
    background: cornflowerblue;
    color: white;
    display: flex;
    border-radius: 5px;
    margin: 5px;
    padding: 2px 10px;
    align-items: center;
`
const Place = styled.h2`
    float: left;
    font-size: 25px;
    margin: 0;
`
const AvatarImg = styled.img`
border-radius: 100%;
height:50px;
background: lightsteelblue;
margin-left: 5px;
`
const RewardPMedal = styled.p`
color: goldenrod;
font-size: 30px;
margin: 0; 

`
const RewardPRibbon = styled.p`
color: palegreen;
font-size: 30px;
margin: 0; 
`

const LeaderName = styled.h2`
flex-grow: 3;
text-align: center;
margin: 0;
padding: 10px;
font-size: 20px;

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
            <AvatarImg src={avatar}></AvatarImg>
            <LeaderName>{name}</LeaderName>
            <Place>{points}</Place>
            {reward(position)}
        </ListLeaderboard>
    )
}