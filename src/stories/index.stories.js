import React from 'react';
import { storiesOf } from '@storybook/react';
import  Leaderboard  from '../components/Leaderboard/index'
import Pointsbutton from '../components/Leaderboard/PointsButton'
import { action } from "@storybook/addon-actions";
import Header from '../components/Leaderboard/Header'
import LeaderboardList from '../components/Leaderboard/LeaderboardList';

storiesOf('Leaderboard', module)
	.add( 'Volunteer panel', () => <Leaderboard/>)
	.add('Button', () => <Pointsbutton>Highest Points</Pointsbutton>)
	.add('Header', () => <Header/>)
	.add('Leaderboard List', () => <LeaderboardList/>)

