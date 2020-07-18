import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login({
    handleChange,
    handleSubmit,
    handleLogoutClick,
    loggedInStatus,
    user,
    currentUser,
}) {

    let responseFacebook = response => console.log(response);

    useEffect(() => {
        axios.get('http://localhost:3000/users').then((response) => {
            console.log(response.data.body);
        });
    }, [responseFacebook]);
    // Loop through the users 
    // If a user's email is in the database AND they're a fbUser, log them in 
    // Otherwise, prompt them with a component that tells them they're registering 
    // Then, add them to the database and log them in 
    // Problems: this useEffect is being triggered several times - reduce the about of times it's being triggered 

    let componentClicked = () => console.log('clicked');
    let fbData;

    if (loggedInStatus === "Logged in") {
        fbData = null;
    } else {
        fbData = (
            <FacebookLogin
                appId="285017142581524"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} 
            />
        );
    }
    return (
        
        <div>
            <h1>Status: {loggedInStatus}</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={user.email} 
                    onChange={handleChange} 
                    required 
                />
                 <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={user.password} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
                <div>
                    <p>Don't have an account:<Link to="/register">Click to Register</Link></p>
                </div>  
            </form>
            <div>{fbData}</div>
            {currentUser && <button onClick={() => handleLogoutClick()}>Logout</button>}
        </div>
    )
}