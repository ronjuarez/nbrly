import { useState, useEffect } from "react";
import axios from "axios";

// This custom hook is the beiung used to manage the overall data of our app.
export default function useApplicationData() {

  const [state, setState] = useState ({
    users: [],
    requests: [],
    leaderboard: [],
    logged : {
      loggedInStatus: "Not logged in",
      user: {}
    }
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
        if (response.data.logged_in && state.logged.loggedInStatus === "Not logged in") {
          setState(prev => ({
            ...prev,
            logged: { 
              loggedInStatus: "Logged in",
              user: response.data.user 
          }
          }))
        } else if (!response.data.logged_in && state.logged.loggedInStatus === "Logged in") {
          setState(prev => ({
            ...prev,
            logged: { 
              loggedInStatus: "Not logged in",
              user: {}
            }
          }))
        }

      })
      .catch(error => {
        console.log(error); 
      })
    }

    function handleLogin(data) {
      setState({
        logged : {
          loggedInStatus: "Logged in",
          user: data
        }
      })
    }

    function handleLogout() {
      setState({
        logged : {
          loggedInStatus: "Not logged in",
          user: {}  
        }
      })
    }  
    
    
      return { 
        state, 
        handleLogin, 
        handleLogout 
      }
    
    }