import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    checkLoginStatus()
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

    function checkLoginStatus() {
      axios.get('http://localhost:3000/logged_in', { withCredentials: true }
      ).then(response => {
        if (response.data.logged_in && logged.loggedInStatus === "Not logged in") {
          setLogged({
            loggedInStatus: "Logged in",
            user: response.data.user
          })
        } else if (!response.data.logged_in && logged.loggedInStatus === "Logged in") {
          setLogged({
            loggedInStatus: "Not logged in",
            user: {}
          })
        }

      })
      .catch(error => {
        console.log(error); 
      })
    }
    function handleLogin(data) {
      setLogged({
        loggedInStatus: "Logged in",
        user: data
      })
    }
    console.log()
    function handleLogout() {
      setLogged({
        loggedInStatus: "Not logged in",
        user: {}  
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
              user={state.users[2]}
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
              user={state.users[0]}
            />
          </Route>
         
          <Route path="/">
            <Homepage 
              {...props} 
              handleLogin={handleLogin}
              handleLogout={handleLogout} 
              loggedInStatus={logged.loggedInStatus}
            />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

