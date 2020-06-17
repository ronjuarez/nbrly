import React from 'react'
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';


const TaskCompletedContainer = styled.main`
height: 80%;
width: 100%;
display: flex;
flex-wrap: wrap;
flex-direction: column;
padding: 0 30px;
font-size: 20px;
`
const StyledDiv = styled.div`
margin: 20px 0;
width: 100%;
background-color: cornflowerblue;
color: white;
text-align: center;
`

const Points = styled.p`
margin: 20px 0;
width: 100%;
background-color: cornflowerblue;
color: white;
text-align: center;
`
export default function TaskCompleted({
  currentUser,
  requests,
  earnedPoints

}) {
  console.log('current User', currentUser)
  const { id } = useParams();
  let index = requests.findIndex(obj => obj.id === parseInt(id))

  const groceryList = requests && requests.length && requests[index].items.map(item => item)
 

  return (
    <TaskCompletedContainer>
      <StyledDiv>
        <h1>Congratulations {currentUser.name} you earned </h1>
        <Points>{earnedPoints(groceryList, requests[index].complete_by)} Points</Points>
        <h5>Thank you for being nbrly</h5>
      </StyledDiv>
      <Link to="/requests"> See all Requests</Link>
    </TaskCompletedContainer>

  )

}