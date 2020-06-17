import React from 'react'
import { useParams, Link } from 'react-router-dom';

export default function TaskCompleted({
  currentUser,
  requests,
  addPoints
}) {
  console.log('current User', currentUser)
  const { id } = useParams();
  let index = requests.findIndex(obj => obj.id === parseInt(id))

  const groceryList = requests && requests.length && requests[index].items.map(item => item)
 

  return (
    <main>
      <h1>Congratulations {currentUser.name} you earned </h1>
      <h2>{addPoints(currentUser, groceryList)}</h2>
      <h3>Points</h3>
      <h5>Thank you for being nbrly</h5>
      <p>You now have {currentUser.points} pts</p>
      <p>You now have ______ pts</p>
      <Link to="/requests"> See all Requests</Link>
    </main>

  )

}