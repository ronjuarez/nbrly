import React from 'react';
import { storiesOf } from '@storybook/react';
import  Leaderboard  from '../components/Leaderboard/index'
import Pointsbutton from '../components/Leaderboard/PointsButton'
import { action } from "@storybook/addon-actions";
import Header from '../components/Leaderboard/Header'
import LeaderboardList from '../components/Leaderboard/LeaderboardList';
import RequestListItem from '../components/Request/RequestListItem';
import AcceptButton from '../components/Request/AcceptButton';
import RequestList from '../components/Request/RequestList';
import RequestForm from '../components/Request/RequestForm';
import ReimbursementDropDown from '../components/Request/Reimbursement';
import Groceries from '../components/Request/Groceries';
import TaskCompleted from '../components/Task/taskCompleted'
import Task from '../components/Task/index'
import Profile from '../components/Profile/index'
import SignIn from '../components/Profile/SignIn'







storiesOf('Leaderboard', module)
	.add( 'Volunteer panel', () => <Leaderboard/>)
	.add('Button', () => <Pointsbutton>Highest Points</Pointsbutton>)
	.add('Header', () => <Header/>)
	.add('Leaderboard List', () => <LeaderboardList/>)




storiesOf('Request', module)
	.add('RequestListItem', () => <RequestListItem />)
	.add('AcceptButton', () => <AcceptButton />)
	.add('RequestList', () => <RequestList />)
	.add("RequestForm", () => <RequestForm/>)
	.add("ReimbursementDropDown", () => <ReimbursementDropDown/>)
	.add("Groceries", () => <Groceries/>)
	

storiesOf('Task', module)
	.add("Task", () => <Task/>)
	.add("TaskCompleted", () => <TaskCompleted/>)



storiesOf('Profile', module)
	.add("Profile", () => <Profile/>)
	.add("SignIn", () => <SignIn/> )