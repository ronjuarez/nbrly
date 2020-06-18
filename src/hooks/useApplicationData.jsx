import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Moment from 'react-moment';

// This custom hook is the beiung used to manage the overall data of our app.
export default function useApplicationData() {


  const [state, setState] = useState ({
    users: [],
    user: {
      name: "",
      email: "",
      password: "",
      loginErrors: ""
    },
    requests: [],
    request: {
      user_id: "",
      items: [],
      delivery_address: "",
      longitude: "",
      latitude: "",
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

  function setCoords(lat, lon) {
    setState(prev => ({
    ...prev,
      request: { 
        ...prev.request, 
        latitude: lat,
        longitude: lon
      } 
    }))
  }

  function setDeliveryAddress (address) {
      setState(prev => ({
      ...prev,
        request: {
          ...prev.request, 
          delivery_address: address
        }
      }))
  }

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
      console.log('hi')
      axios.get('http://localhost:3000/logged_in', { withCredentials: true }
      ).then(response => {
        console.log(response)
        if (response.data.logged_in && state.logged.loggedInStatus === "Not logged in") {
          setState(prev => ({
            ...prev,
            logged: { 
              ...prev.logged,
              loggedInStatus: "Logged in",
              user: response.data.user 
          }
          }))
        } else if (!response.data.logged_in && state.logged.loggedInStatus === "Logged in") {
          setState(prev => ({
            ...prev,
            logged: { 
              ...prev.logged,
              loggedInStatus: "Not logged in",
              user: {}
            }
          }))
        }})
        .catch(error => {
        console.log(error); 
        })
    }


    function destroySession() {
      axios.delete('http://localhost:3000/logout', { withCredentials: true }
      ).then(response => {
          console.log(response)
          handleLogout()
      }).catch(error => {
          console.log("logout error", error)
      }) 
  }

    function handleLogin(data) {
      setState(prev => ({
        ...prev, 
        logged : {
          ...prev.logged,
          loggedInStatus: "Logged in",
          user: data.user
        }
      }))
    }

    function handleLogout() {
      setState(prev => ({
        ...prev, 
        logged : {
          ...prev.logged,
          loggedInStatus: "Not logged in",
          user: {}  
        }
      }))
    }  
    
    function getTask (requests, user) { 
      requests.filter(request => {
        return (request.volunteer_id === user.id)
      })
    }

    function handleSuccessfulAuth(data) {
      handleLogin(data);
    }

    function newRegistration(event) {
      axios.post("http://localhost:3000/registrations", {
          user: {
              name: state.user.name,
              email: state.user.email,
              password: state.user.password,
              avatar: "https://robohash.org/sitsequiquia.png?size=300x300&set=set1"
          }
      },
      { withCredentials: true }
      ).then(response => {
        console.log(response)
          if(response.data.status === 'created') {
            handleSuccessfulAuth(response.data);
          }
      })
      .catch(error => {
          console.log("registration error", error);
      });
      event.preventDefault();
  }


    function submitNewRequest(event) {
      axios.post("http://localhost:3000/requests", {
        requests: {
          user_id: state.logged.user.id,
          delivery_address: state.request.delivery_address,
          items: state.request.items,
          reimbursement_type: state.request.reimbursement_type,
          latitude: state.request.latitude,
          longitude: state.request.longitude,
          complete_by: state.requestDate,
          volunteer_completed_task: state.request.volunteer_completed_task,
          requester_confirmed_completion: state.request.requester_confirmed_completion,
        }
      })
      .then(response => {
        setState(prev => ({
          ...prev,
          requests: [...prev.requests, response.data]
        }))
      })
      .catch(error => {
      console.log('oups', error);
      })
      event.preventDefault();
  }
  
  function removeItem(id) {
    setState(prev => ({
      ...prev, 
      request: {
        ...prev.request, 
        items: prev.request.items.filter((_, index) => index !== id)
      }
    }))
  }

    function changeRequest(event) {
      const name = event.target.name;
      const value = event.target.value;
      setState(prev => ({
        ...prev,
        request: {
          ...prev.request,
          [name]: value
        }
      })) 
    }

    function changeUser(event) {
      const name = event.target.name;
      const value = event.target.value;
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [name]: value
        }
      }))
    }

    function setRequestDate(value) {
      setState(prev => ({
        ...prev,
        requestDate: value
      }))
    }

    function addRequestItem(item) { 
      setState(prev => ({
        ...prev, 
        request: {
          ...prev.request, 
          items:[...prev.request.items, item] 
        }  
      }))
    }

    function removeVolunteer (arID) {
     
      let newState = [...state.requests]
      let index = newState.findIndex(req => req.id === parseInt(arID))
      

      axios.put(`http://localhost:3000/requests/${arID}`, {
        volunteer_id: null
      })
      .then(all => {
        newState.splice(index, 1, all.data.body)
        
        setState(prev => ({
          ...prev,
          requests: newState
        }))
      })
      .catch(error => {
        console.log(error);
      });
    }

    function addPoints (user, numOfItems) {
      
      let itemsLength = numOfItems.length;
      return (user.points + itemsLength*100)
    }  
    
    function createSession(event) {
      axios.post("http://localhost:3000/sessions", {
          user: {
              email: state.user.email,
              password: state.user.password,
          }
      },
      { withCredentials: true }
      ).then(response => {
          if(response.data.logged_in) {
            handleSuccessfulAuth(response.data);
          }
      })
      .catch(error => {
          console.log("login error", error);
      });
      event.preventDefault();
    }
    
    function assignVolunteer (arID, userID) {
      let newState = [...state.requests]
      let index = newState.findIndex(req => req.id === parseInt(arID))
     
      axios.put(`http://localhost:3000/requests/${arID}`, {
        volunteer_id: userID
      })
      .then(all => {
        newState.splice(index, 1, all.data.body)
        setState(prev => ({
          ...prev,
          requests: newState
        }))
      })
      .catch(error => {
        console.log(error);
      });
    }

    function confirmRequest (arID) {
      axios.put(`http://localhost:3000/requests/${arID}`, {
        requester_confirmed_completion: true
      })
      .then(all => {
        console.log('Request Completion Confirmed', all);
      })
      .catch(error => {
        console.log(error);
      });
    }
    const earnedPoints = (requestData, completedDate) => {
      let itemsLength = requestData.length;
      let currentDate = new Date()
      // if satement checking date completed by is under 24 hours then add an extra 100 points
      if ( (moment(completedDate).diff(moment(currentDate), 'hours')) < 24) {
        return ((itemsLength * 100) * 2)
      } else {
        return (itemsLength * 100);
      }
    }
  
    function updateDatabase (arID, user, itemsToCount) {
      let newLeaderboard = [...state.leaderboard]
      let index = newLeaderboard.findIndex(leader => leader.id === user.id)
      Promise.all([ 
      axios.put(`http://localhost:3000/requests/${arID}`, {
        volunteer_completed_task: true
      }),
      axios.put(`http://localhost:3000/users/${user.id}`, {
        points: user.points + earnedPoints(itemsToCount, state.request.complete_by)
      })])                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      .then(all => {
        newLeaderboard.splice(index, 1, all[1].data.body)
        setState(prev => ({
          ...prev,
          logged: {
            ...prev.logged,
            user: {
              ...prev.logged.user,
              points: all[1].data.body.points
            }
          },
          leaderboard: newLeaderboard
        }))
      })
      .catch(error => {
        console.log(error);
      });
    
  }
      return { 
        state, 
        removeVolunteer,
        checkLoginStatus,
        handleLogin, 
        handleLogout,
        handleSuccessfulAuth,
        submitNewRequest, 
        changeRequest,
        changeUser,
        removeItem,
        setRequestDate,
        addRequestItem,
        addPoints,
        updateDatabase,
        getTask,
        assignVolunteer,
        setCoords,
        setDeliveryAddress,
        confirmRequest,
        newRegistration,
        createSession,
        destroySession,
        earnedPoints,
      }
    
    }

 