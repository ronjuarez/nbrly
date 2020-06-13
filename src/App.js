import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';
import Task from './components/Task';
import TaskCompleted from './components/Task/TaskCompleted';
import Profile from './components/Profile';
import Registration from './components/auth/Registration';
import MostDeliveries from './components/Leaderboard/MostDeliveries';
import  useApplicationData from "./hooks/useApplicationData";
import NewRequest from './components/Request/NewRequest'


 export default function App(props) {
  const {
    state, 
    handleLogin, 
    handleLogout 
  } = useApplicationData()


  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/requests">
            <Request
              requests={state.requests}
            />
          </Route>
          <Route path="/requests/new">
            <NewRequest
            currentUser={state.logged.user}/>
          </Route>
          <Route path="/requests/:id">
            <Task
              currentUser={state.logged.user}
              requests={state.requests}
            />
          </Route>
          <Route path={`/requests/complete`}>
            <TaskCompleted/>
            </Route>  
          <Route exact path="/leaderboard">
            <Leaderboard
              users={state.leaderboard}
            />
          </Route>
          <Route path ="/leaderboard/mostdeliveries">
            <MostDeliveries
            players={state.leaderboard}/>
          </Route>

          <Route path="/profile">
            <Profile 
              currentUser={state.logged.user}
            />
          </Route>
         
          <Route path="/">
            <Homepage 
              {...props} 
              handleLogin={handleLogin}
              handleLogout={handleLogout} 
              loggedInStatus={state.logged.loggedInStatus}
            />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

