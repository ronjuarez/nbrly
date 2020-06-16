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

import styled from 'styled-components';

const MainApp = styled.main`
height: 900px;
border: solid 3px grey;
width: 600px;
position: fixed;
left: 700px;
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

  const {
    state,
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
    destroySession
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
              setDeliveryAddress={setDeliveryAddress}/>
          </Route>
          <Route path={`/requests/:id/complete`}>
            <TaskCompleted
              currentUser={state.logged.user}
              requests={state.requests}
              addPoints={addPoints}/>
          </Route>  
          <Route path="/requests/:id">
            {state.logged.loggedInStatus ?
              <Task
                currentUser={state.logged.user}
                requests={state.requests}
                addPoints={addPoints}
                updateDatabase={updateDatabase}/> :
              <Redirect to exact="/"/>}
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
            {state.logged.loggedInStatus ?
              <Profile 
                currentUser={state.logged.user}
                request={state.request}
                requests={state.requests}
                confirmRequest={confirmRequest}/> : 
              <Redirect to exact="/" />}
          </Route>
          <Route path="/register">         
            <Registration
              {...props} 
              handleSubmit={newRegistration}
              handleLogout={handleLogout}
              handleChange={changeRequest}
              user={state.user}
              loggedInStatus={state.logged.loggedInStatus}/>}
          </Route>
          <Route path="/login">         
            <Login 
              {...props} 
              currentUser={state.logged.user} 
              user={state.user}
              handleSubmit={createSession}
              handleLogoutClick={destroySession}
              handleChange={changeRequest}
              loggedInStatus={state.logged.loggedInStatus}/>}
          </Route>
          <Route exact path="/">
            {/* {state.logged.loggedInStatus ?          */}
              <Homepage 
                {...props}
                currentUser={state.logged.user}
                assignVolunteer={assignVolunteer}
                requests={state.requests}
                handleLogin={handleLogin}
                handleLogout={handleLogout} 
                loggedInStatus={state.logged.loggedInStatus}/> 
              {/* <Redirect to="/login"/>} */}
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
