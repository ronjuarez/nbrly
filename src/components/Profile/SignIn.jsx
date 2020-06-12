import React from "react";

export default function SignIn() {
  
  return(
    <main>
      <form>
        <label>Email</label>
        <input 
        type='email'
        name='email' />
        <label>Password</label>
        <input 
        type='password'
        name='email' />
        <input type='submit' />
      </form>
    </main>
    
  )
}