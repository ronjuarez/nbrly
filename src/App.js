import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import Homepage from "components/Homepage"

const Loader = styled.div``;

const Row = styled.li`
  list-style: none;
  margin: 10px;
`;

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
          <ul>
            <li>
              <Link to="/">All Requests</Link>
            </li>
            <li>
              <Link to="/request">Current Request</Link>
            </li>
            <li>
              <Link to="/profile">User Profile</Link>
            </li>
            <li>
              <Link to ="/leaderboard"></Link>
            </li>
          </ul>
          </div>
  
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
      </Router>

    );
  }
  