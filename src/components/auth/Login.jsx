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

    const [ facebookUser, setfacebookUser ] = useState()

    let responseFacebook = response => setfacebookUser(response);

    useEffect(() => {
        axios.get('http://localhost:3000/users').then((response) => {
            for (let user of response.data.body) {
                if ((user.email === facebookUser.email) && user.fb_user === true) {
                    console.log("Facebook user found in database");
                    // set Facebook User to current user 
                    // --> handleChange, changeUser 
                } else {
                    // Prompt them with a registration component, then add them to the database and set them as current user 
                    fbRegisterComponent = <h1>"Register PopUp"</h1>;
                }
            };
        }).catch((response) => console.log(response));
    }, facebookUser);
    // Problems: this useEffect is being triggered several times - reduce the about of times it's being triggered 
    // What are the arguments for useEffect? 

    let componentClicked = () => console.log('clicked');
    let fbData;
    let fbRegisterComponent; 

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