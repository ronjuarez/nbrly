import React from 'react'
import { useParams } from 'react-router-dom';

export default function TaskCompleted({
  currentUser,
  requests,
  addPoints
}) {

  const { id } = useParams();
  let index = requests.findIndex(obj => obj.id == id)

  const groceryList = requests && requests.length && requests[index].items.map(item => item)
  console.log(groceryList)

  return (
    <main>
      <h1>Congratulations {currentUser.user.name} you earned </h1>
      <h2>{addPoints(currentUser.user, groceryList)}</h2>
      <h3>Points</h3>
      <h5>Thank you for being nbrly</h5>
      <p>You now have {currentUser.user.points} pts</p>
      <p>You now have ______ pts</p>
    </main>
  )

}