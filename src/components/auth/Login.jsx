import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Login(props) {

    const [user, setUser] = useState ({
        email: "",
        password: "",
        loginErrors: ""
    })

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUser(user => ({
            ...user, 
            [name]: value
        }))
    }
    function handleSubmit(event) {
        axios.post("http://localhost:3000/sessions", {
            user: {
                email: user.email,
                password: user.password,
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

    function handleLogoutClick() {
        axios.delete('http://localhost:3000/logout', { withCredentials: true }
        ).then(response => {
            console.log(response)
            props.handleLogout()
        }).catch(error => {
            console.log("logout error", error)
        }) 
    }

    function handleSuccessfulAuth(data) {
        props.handleLogin(data);
    }

    
    console.log(props.currentUser)

    return (
        
        <div>
            <h1>Status: {props.loggedInStatus}</h1>
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
            
            {props.currentUser.user &&  <button onClick={() => handleLogoutClick()}>Logout</button>}
        </div>
    )
}