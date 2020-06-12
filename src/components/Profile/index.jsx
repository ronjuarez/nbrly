import React from 'react';

export default function Profile ({
  users,
}) {
 


  const user = users.map(user => {
    return (
      <div>
        <img src={user.avatar} alt="profile picture"></img>
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
      </div>
    )
  })
  return (
    <main>
      <h1>Profile</h1>
      <header>
        {user}
      </header>
    
      <div>
        <div>
          <h2>
            Current Points
          </h2>
          <p>{users[0].points}</p>
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