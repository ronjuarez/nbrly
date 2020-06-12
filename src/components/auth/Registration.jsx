import React, { useState } from 'react';
import axios from 'axios';


export default function Registration(props) {

    const [user, setUser] = useState ({
        name: "",
        email: "",
        password: "",
        avatar: "https://robohash.org/sitsequiquia.png?size=300x300&set=set1",
        errors: ""
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
        axios.post("http://localhost:3000/registrations", {
            user: {
                name: user.name,
                email: user.email,
                password: user.password,
                avatar: user.avatar
            }
        },
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created') {
                props.handleSuccessfulAuth(response.data);
            }
        })
        .catch(error => {
            console.log("registration error", error);
        });
        event.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={user.name} 
                    onChange={handleChange} 
                    required 
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    )
}