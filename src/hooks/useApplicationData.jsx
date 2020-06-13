import { useState, useEffect } from "react";
import axios from "axios";

// This custom hook is the beiung used to manage the overall data of our app.
export default function useApplicationData() {


  const [state, setState] = useState ({
    users: [],
    requests: [],
    request: {
      user_id: "",
      items: [],
      delivery_address: "",
      reimbursement_type: "",
      volunteer_completed_task: false,
      requester_confirmed_completion: false
    },
    leaderboard: [],
    logged: {
      loggedInStatus: "Not logged in",
      user: {}
    },
    requestDate: new Date()
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
    

    function submitNewRequest() {
      axios.post("http://localhost:3000/requests", {
        requests: {
          user_id: state.logged.user.id,
          delivery_address: state.request.delivery_address,
          items: state.request.items,
          reimbursement_type: state.request.reimbursement_type,
          complete_by: state.requestDate,
          volunteer_completed_task: state.request.volunteer_completed_task,
          requester_confirmed_completion: state.request.requester_confirmed_completion,
        }
      })
      .then(response => {
      console.log("new request created!", response.data);
      })
      .catch(error => {
      console.log('oups', error);
      })

  }
  
    function removeItem(id) {
      setState (prev => ({
        ...prev, 
        requests: {
          items: prev.items.filter((_, index) => index !== id)
        }
      }))
    }

    function changeRequest(event) {
      const name = event.target.name;
      const value = event.target.value;
      setState(prev => ({
        ...prev,
        request: {
          [name]: value
        }
      })) 
    }

    function setRequestDate(value) {
      setState({
        requestDate : value
      })
    }

    function addRequestItem(item) { 
      setState(prev => ({...prev, 
        request: { items:[...prev.items, item]}}))
    }
      return { 
        state, 
        handleLogin, 
        handleLogout,
        submitNewRequest, 
        changeRequest,
        removeItem,
        setRequestDate,
        addRequestItem
      }
    
    }