import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://localhost:8080';

export default function Chatroom() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [connection, setConnection] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const conn = socketIOClient(ENDPOINT);
    setConnection(conn);

    conn.on('initial', data => {
      setUser(data.user);
      setUsers([...data.users]);
    })
    conn.on('users', data => {
      setUsers([...data.users]);
    })
    conn.on('message', data => {
      setMessages(prev => [...prev, data])
    })
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    connection.emit('message', {user, message: evt.target.message.value})
  }

  return (
    <div className="chatroom">
      {users.map(u => <li>{u.username}</li>)}
      {messages.map(msg => <li><b>{msg.user.username}:</b>{msg.message}</li>)}
      <form onSubmit={handleSubmit}>
        <input type='text' name='message'/>
        <button>Submit</button>
      </form>
    </div>
  );
}