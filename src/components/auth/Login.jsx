import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Login({
    handleChange,
    handleSubmit,
    handleLogoutClick,
    loggedInStatus,
    user,
    currentUser,
}) {

    let responseFacebook = response => console.log(response);

    let componentClicked = () => console.log('clicked');
    let fbData;

    if (loggedInStatus === "Logged in") {
        fbData = null;
    } else {
        fbData = (
            <FacebookLogin
                appId="270320127388791"
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