import React from 'react';
import Registration from '../auth/Registration'

export default function Homepage(props) {

    function handleSuccessfulAuth(data) {
        props.handleLogin(data);
    }
    return (
        <div>
            <h1>Status: {props.loggedInStatus}</h1>
            <Registration handleSuccessfulAuth={handleSuccessfulAuth}/>
        </div>
    )
};

