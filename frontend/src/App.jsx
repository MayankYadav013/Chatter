import React from 'react'
import Left from './home/leftpart/Left'
import Right from './home/Rightpart/Right'
import Signup from '../components/Signup'
import Login from '../components/Login';

function App() {
  return (
    <div className='flex h-screen'>
      <Left/>
      <Right/>
    </div>
    // <Signup/>
    // <Login/>
  )
}

export default App
