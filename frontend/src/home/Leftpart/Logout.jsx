import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";

function Logout() {
  return (
    <div>
      <BiLogOutCircle className='p-2 mt-2 text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full' />
    </div>
  )
}

export default Logout
