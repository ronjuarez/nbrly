import React, { useState } from 'react';
import axios from 'axios';


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
                props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {
            console.log("login error", error);
        });
        event.preventDefault();
    }
    return (
        <div>
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
            </form>
        </div>
    )
}