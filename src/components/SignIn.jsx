import React from "react";
import styled from 'styled-components';

const SignInForm = styled.form`
display: flex;
flex-direction: column;
margin: 20px 50px;
background: cornflowerblue;
padding: 50px;
border-radius: 20px;
color: white;
input { 
  margin-bottom: 20px;
  background: peachpuff;
  border: none;
}
button{ 
  padding: 0;
  margin: 0;
  border: none;
}
`


export default function SignIn() {
  
  return(
    <main>
      <SignInForm>
        <h1>Sign In</h1>
          <label for="login-email">E-mail</label>
          <input 
          type='email'
          name='login-email' />
          <label for="login-password">Password</label>
          <input 
          type='password'
          name='login-password'/>
          <button type="submit" >Login</button>
      </SignInForm>
    </main>
    
  )
}