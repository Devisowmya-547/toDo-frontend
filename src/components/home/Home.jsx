import React from 'react'
import Task from '../task/Task'
import Note from '../note/Note'
import { useLocation } from 'react-router-dom'

function Home() {
  const location = useLocation()
  const email = location.state.email
  
  return (
    <div style={{background : 'Black', color : 'white'}}>
      <Task email={email}/>
      <Note email={email}/>
    </div>
  )
}

export default Home
