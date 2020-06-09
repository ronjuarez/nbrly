import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const Loader = styled.div``;

const Row = styled.li`
  list-style: none;
  margin: 10px;
`;

export default function App ({
}) {

  const [users, setUsers] = useState ([]);
    // requests: {},
    // leaderboard: {}
  // });

  useEffect(() => {
    Promise.all([
    axios({
      method: "GET",
      url: `http://localhost:3000/users`})
    // axios({
    //   method: "GET",
    //   url: 'http://localhost:3000/requests'}),
    // axios({
    //   method: "GET",
    //   url: `http://localhost:3000/leaderboard`}),
    ])
      .then((dbList) => {
        console.log(dbList) 
          // requests: dbList[1].data, leaderboard: dbList[2].data}))
      })
      .catch((error) => {
        console.log(error)
      })
    }, []);

    return (
      <h1>
        {users}
      </h1>
    );
  }
  