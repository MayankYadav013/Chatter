import React from 'react'
import Search from './search'
import Users from './users'
import Logout from './logout'

function Left() {
  return (
    <div className='w-[30%] text-gray-300 bg-black'>
      <Search/>
      <Users/>
      <Logout/>
    </div>
  )
}

export default Left
