import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Navigation from './components/navigation';
import Leaderboard from './components/Leaderboard';
import Request from './components/Request';
import Homepage from './components/Homepage';
import Task from './components/Task';
import TaskCompleted from './components/Task/TaskCompleted';
import Profile from './components/Profile';
import MostDeliveries from './components/Leaderboard/MostDeliveries';
import useApplicationData from "./hooks/useApplicationData";
import NewRequest from './components/Request/NewRequest'
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import styled from 'styled-components';
const libraries = ["places"];
const MainApp = styled.main`
height: 900px;
border: solid 3px grey;
width: 600px;
position: fixed;
left: 500px;
top: 50px;
border-radius: 10px;
`
const Section = styled.section`
height: 90%;
width: 100%;
`
const StyledNav = styled.div`
height: 10%;
width: 100%;
`

 export default function App(props) {
     
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
      libraries 
});


  const {
    state,
    removeVolunteer,
    handleLogin, 
    handleLogout,
    submitNewRequest,
    changeRequest,
    removeItem,
    setRequestDate,
    addRequestItem,
    addPoints,
    updateDatabase,
    assignVolunteer,
    setCoords,
    setDeliveryAddress,
    confirmRequest,
    newRegistration,
    createSession,
    destroySession,
    earnedPoints,
    changeUser
  } = useApplicationData()
     return (
      <MainApp>
      <Router>
       
        <Section>
        <Switch>
          <Route exact path="/requests">
            <Request
              requests={state.requests}
              currentUser={state.logged.user}
              assignVolunteer={assignVolunteer}/>
          </Route>
          <Route path="/requests/new">
          {state.logged.loggedInStatus === "Logged in" ?
            <NewRequest
              newRequest={submitNewRequest}
              currentUser={state.logged.user}
              changeRequest={changeRequest}
              removeItem={removeItem}
              request={state.request}
              requestDate={state.requestDate}
              addItem={addRequestItem}
              setCoords={setCoords}
              setDate={setRequestDate}
              setDeliveryAddress={setDeliveryAddress}/> : 
              <Redirect to ="/login"/>}
          </Route>
          <Route path={`/requests/:id/complete`}>
            <TaskCompleted
            earnedPoints={earnedPoints}
              currentUser={state.logged.user}
              requests={state.requests}
              addPoints={addPoints}/>
          </Route>  
          <Route path="/requests/:id">
             {state.logged.loggedInStatus === "Logged in" ?               
             <Task
                removeVolunteer={removeVolunteer}
                currentUser={state.logged.user}
                requests={state.requests}
                addPoints={addPoints}
                updateDatabase={updateDatabase}/> :
                <Redirect to="/login"/>}
          </Route>
          <Route exact path="/leaderboard">
            <Leaderboard
              users={state.leaderboard}/>
          </Route>
          <Route path ="/leaderboard/mostdeliveries">
            <MostDeliveries
              players={state.leaderboard}/>
          </Route>
          <Route path="/profile">
            {/* {state.logged.loggedInStatus === "Logged in" ? */}
              <Profile 
                currentUser={state.logged.user}
                request={state.request}
                requests={state.requests}
                confirmRequest={confirmRequest}
                handleLogoutClick={destroySession}/> 
               {/* :
                <Redirect to="/login" />}  */}
          </Route>
          <Route path="/register">         
            <Registration
              {...props}
              handleSubmit={newRegistration}
              handleChange={changeUser}
              user={state.user}
              loggedInStatus={state.logged.loggedInStatus}/>
          </Route>
          <Route path="/login">         
            <Login 
              {...props} 
              currentUser={state.logged.user} 
              user={state.user}
              handleSubmit={createSession}
              handleLogoutClick={destroySession}
              handleChange={changeUser}
              loggedInStatus={state.logged.loggedInStatus}/>
          </Route>
          <Route exact path="/">
              <Homepage 
                {...props}
                currentUser={state.logged.user}
                assignVolunteer={assignVolunteer}
                requests={state.requests}
                handleLogin={handleLogin}
                handleLogout={handleLogout} 
                loggedInStatus={state.logged.loggedInStatus}/> 
 
          </Route>
        </Switch>
        </Section>
        <StyledNav>
          <Navigation />
        </StyledNav>
      </Router>
    </MainApp> 
    )
  }
