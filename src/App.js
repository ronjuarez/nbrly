import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation'
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';

function App() {
  const [state, setState] = useState ({
    users: [],
    requests: [],
    leaderboard: []
  });

  useEffect(() => {
    Promise.all([
    axios.get(`http://localhost:3000/users`),
    axios.get('http://localhost:3000/requests'),
    axios.get(`http://localhost:3000/leaderboard`),
    ])
    .then((all) => {
     console.log(all[0])})
      .catch((error) => {
        console.log(error)
      })
    }, []);

  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/leaderboard"><Leaderboard/></Route>
          <Route path="/request"><Request /></Route>
          <Route path="/"><Homepage /></Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;


// node 10.16.1 (nvm install 10.16.1 or nvm use 10.16.1)
// npm install create-react-app
// create-react-app nbrly
// cd nbrly
// npm install axios
// npm i -S @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
// npx -p @storybook/cli sb init
// go to old folder move src into this one
// rebuild app.js line by line ( for some reason !!)