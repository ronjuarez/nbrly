import React, { useState } from 'react';
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
            
            {currentUser && <button onClick={() => handleLogoutClick()}>Logout</button>}
        </div>
    )
}