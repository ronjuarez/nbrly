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
    handleSuccessfulAuth
}) {

    const [ facebookUser, setfacebookUser ] = useState()
    let responseFacebook = response => {
        setfacebookUser(response)
    };
    console.log(facebookUser);
    // create object 
    // send user object to back 
    // find user in rails with query (email and fbUser = true)
    // JSon object response from rails 

    function loginFacebookUser() {
        axios.post("http://localhost:3000/sessions", {
            user: {
                email: facebookUser.email, 
                password: facebookUser.accessToken
            }
        }, {withCredentials: true})
        .then(response => {
            if (response.data.status === 401) {
                console.log("Facebook user is being registered.")
                axios.post("http://localhost:3000/registrations", {
                    user: {
                        name: facebookUser.name,
                        avatar: facebookUser.picture.data.url, 
                        email: facebookUser.email, 
                        password: facebookUser.accessToken.substring(0, 71), 
                        fbUser: true
                    }
                }, {withCredentials: true})
                .then((response) => {
                    if (response.data.status === "created") {
                        handleSuccessfulAuth(response.data)
                    }
                })
                .catch(error => console.log("Error with successful auth, ", error));
            } 
            if (response.data.logged_in) {

                console.log("Facebook user needs to be logged in");
            }
        })
        .catch(error => console.log(error));
    }

    let componentClicked = () => loginFacebookUser();
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