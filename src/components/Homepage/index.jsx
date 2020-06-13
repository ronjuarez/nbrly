import React from 'react';
import axios from 'axios';
import Registration from '../auth/Registration';
import Login from '../auth/Login';

export default function Homepage(props) {

    function handleSuccessfulAuth(data) {
        props.handleLogin(data);
    }

    function handleLogoutClick() {
        axios.delete('http://localhost:3000/logout', { withCredentials: true }
        ).then(response => {
            console.log(response)
            props.handleLogout()
        }).catch(error => {
            console.log("logout error", error)
        }) 
    }
    return (
        <div>
            <h1>Status: {props.loggedInStatus}</h1>
            <button onClick={() => handleLogoutClick()}>Logout</button>
            <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
            <Login  handleSuccessfulAuth={handleSuccessfulAuth} />
        </div>
    )
};

