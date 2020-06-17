import React from 'react'
import { useParams, Link } from 'react-router-dom';

export default function TaskCompleted({
  currentUser,
  requests,
}) {

  const { id } = useParams();
  let index = requests.findIndex(obj => obj.id == id)

  const groceryList = requests && requests.length && requests[index].items.map(item => item)
 console.log(currentUser)

  return (
    <main>
      <h1>Congratulations {currentUser.name} you earned </h1>
      <h2>{}</h2>
      <h3>Points</h3>
      <h5>Thank you for being nbrly</h5>
      <p>You now have {currentUser.points} pts</p>
      <Link to="/requests"> See all Requests</Link>
    </main>

  )

}