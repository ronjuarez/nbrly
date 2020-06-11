import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import RequestListItem from '../components/Request/RequestListItem';
import AcceptButton from '../components/Request/AcceptButton';
import RequestList from '../components/Request/RequestList';
import RequestForm from '../components/Request/RequestForm';
import ReimbursementDropDown from '../components/Request/Reimbursement';
import Groceries from '../components/Request/Groceries';

<<<<<<< HEAD
storiesOf('Card', module)
	.add( 'Default Card', () => <h1>Hello World</h1>)


storiesOf('Request', module)
	.add('RequestListItem', () => <RequestListItem />)
	.add('AcceptButton', () => <AcceptButton />)
	.add('RequestList', () => <RequestList />)
	.add("RequestForm", () => <RequestForm/>)
	.add("ReimbursementDropDown", () => <ReimbursementDropDown/>)
	.add("Groceries", () => <Groceries/>)
	
=======
storiesOf('Task', module)
	.add( 'Default Card', () => <h1>Hello World</h1>)
>>>>>>> master
