import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Homepage from "./components/Homepage";
import Navigation from './components/navigation'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Leaderboard from './components/Leaderboard';


export default function App ({
}) {

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
             <Route path="/leaderboard"><Leaderboard/></Route>
           </Switch>
          </div>
      </Router>

    );
  }
  