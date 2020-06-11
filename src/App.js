import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Task from './components/Task';
import Profile from './components/Profile'
import Homepage from './components/Homepage'


 export default function App(props) {
  const [state, setState] = useState ({
    users: [],
    requests: [],
    leaderboard: []
  });

  useEffect(() => {
    Promise.all([
    axios.get('http://localhost:3000/users'),
    axios.get('http://localhost:3000/requests'),
    axios.get('http://localhost:3000/leaderboard')
    ])
    .then((all) => {
      // console.log(all)
      setState(prev => ({
        ...prev,
        users: all[0].data.body, requests: all[1].data.body, leaderboard: all[2].data.body}));
        })
      .catch((error) => {
        console.log(error)
      })
    }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard
              users={state.leaderboard}
            /></Route>
          <Route path="/task">
            <Task
              requests={state.requests}
            /></Route>
          <Route path="/profile">
            <Profile 
              user={state.users}
          /></Route>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}



// node 10.16.1 (nvm install 10.16.1 or nvm use 10.16.1)
// npm install create-react-app
// create-react-app nbrly
// cd nbrly
// npm install axios
// npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
// npx -p @storybook/cli sb init
// go to old folder move src into this one
// rebuild app.js line by line ( for some reason !!)