import React, { useState } from 'react';


export default function Registration({
    handleChange,
    handleSubmit,
    loggedInStatus,
    user
}) {


    return (
        <div>
            <h3>Status: {loggedInStatus}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={user.name} 
                    onChange={handleChange} 
                    required 
                /><br/>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={user.email} 
                    onChange={handleChange} 
                    required 
                /><br/>
                 <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={user.password} 
                    onChange={handleChange} 
                    required 
                /><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}