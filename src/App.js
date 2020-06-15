import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';
import Task from './components/Task';
import TaskCompleted from './components/Task/TaskCompleted';
import Profile from './components/Profile';
import MostDeliveries from './components/Leaderboard/MostDeliveries';
import  useApplicationData from "./hooks/useApplicationData";
import NewRequest from './components/Request/NewRequest'


 export default function App(props) {
  const {
    state, 
    handleLogin, 
    handleLogout,
    submitNewRequest,
    changeRequest,
    removeItem,
    setRequestDate,
    addRequestItem,
    addPoints,
    updateDatabase,
    getTask,
    assignVolunteer
  } = useApplicationData()


  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/requests">
            <Request
              requests={state.requests}
              setDate={setRequestDate}
              addID={assignVolunteer}/>
          </Route>
          <Route path="/requests/new">
            <NewRequest
              newRequest={submitNewRequest}
              changeRequest={changeRequest}
              removeItem={removeItem}
              request={state.request}
              requestDate={state.requestDate}
              currentUser={state.logged.user}
              addItem={addRequestItem}/>}
          </Route>
          <Route path="/requests/:id">
            {state.logged.loggedInStatus ?
              <Task
                currentUser={state.logged.user}
                requests={state.requests}
                addPoints={addPoints}
                updateDatabase={updateDatabase}/> :
              <Redirect to exact="/"/>}
          </Route>
          <Route path={`/requests/complete`}>
            <TaskCompleted/>
          </Route>  
          <Route exact path="/leaderboard">
            <Leaderboard
              users={state.leaderboard}/>
          </Route>
          <Route path ="/leaderboard/mostdeliveries">
            <MostDeliveries
              players={state.leaderboard}/>
          </Route>
          <Route path="/profile">
            {state.logged.loggedInStatus ?
              <Profile 
                currentUser={state.logged.user}
                request={state.request}
                getTask={getTask}/> : 
              <Redirect to exact="/" />}
          </Route>
          <Route exact path="/">
            {state.logged.loggedInStatus ?         
              <Redirect to="/requests" /> :
                <Homepage 
                  {...props} 
                  handleLogin={handleLogin}
                  handleLogout={handleLogout} 
                  loggedInStatus={state.logged.loggedInStatus}/>}
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

