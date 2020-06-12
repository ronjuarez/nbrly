import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';
import Task from './components/Task';
import Profile from './components/Profile';
import Registration from './components/auth/Registration';
import MostDeliveries from './components/Leaderboard/MostDeliveries';

import NewRequest from './components/Request/NewRequest'


 export default function App(props) {
  const [state, setState] = useState ({
    users: [],
    requests: [],
    leaderboard: []
  });

  const [logged, setLogged] = useState({
    loggedInStatus: "Not logged in",
    user: {}
  });

  useEffect(() => {
    Promise.all([
    axios.get('http://localhost:3000/users'),
    axios.get('http://localhost:3000/requests'),
    axios.get('http://localhost:3000/leaderboard')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        users: all[0].data.body, requests: all[1].data.body, leaderboard: all[2].data.body}));
        })
      .catch((error) => {
        console.log(error)
      })
    }, []);

    function handleLogin(data) {
      setLogged({
        loggedInStatus: "LOGGED_IN",
        user: data
      })

    }

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
            <NewRequest/>
          </Route>
          <Route path="/requests/:id">
            <Task
              requests={state.requests}
            />
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
              users={state.users}
            />
          </Route>
         
          <Route path="/">
            <Homepage {...props} handleLogin={handleLogin} loggedInStatus={logged.loggedInStatus}/>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

