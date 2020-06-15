import React from 'react';

export default function Profile ({
  currentUser,
  getTask,
  request
}) {
 
  return (
    <main>
      <h1>Profile</h1>
      <header>
      <div>
        <img src={currentUser.avatar} alt="profile picture"></img>
        <h3>{currentUser.name}</h3>
        <h3>{currentUser.email}</h3>
      </div>
      </header>
    
      <div>
        <div>
          <h2>
            Current Points
          </h2>
          <p>{currentUser.points}</p>
        </div>
        <div>
          <h2>
            Current Task
          </h2>
        </div>
        
      </div>
      
    </main>
  )
}