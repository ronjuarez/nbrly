import React from 'react';

export default function Profile (props) {
 
  const users = [
    {id: 1,
    name: "Dave Weber",
    email: "ali@block.net",
    password_digest: "password",
    points: 70,
    created_at: "2020-06-10T16:53:34.635Z",
    updated_at: "2020-06-10T16:53:34.635Z",
    avatar: "https://robohash.org/veritatiseaquaerat.png?size=300x300&set=set1"
    }
  ]

  const user = users.map(user => {
    return (
      <div>
        <img src={user.avatar} alt="profile picture"></img>
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
      </div>
    )
  })
  console.log(user)
  return {}
    <main>
      <h1>Profile</h1>
      <header>
        {user}
      </header>
      <h2></h2>
    
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