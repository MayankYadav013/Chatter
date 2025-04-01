import React from 'react'
import { IoMdSend } from "react-icons/io";

export default function Typesend() {
  return (
    <div className='flex space-x-1 h-[8vh] bg-gray-800'>
        <div className='w-[70%] mx-4'>
      <input type="text" placeholder="Type here" className="border border-gray-700 rounded-xl outline-none mt-1 px-4 py-3 w-full" />
    </div>
    <button>
        <IoMdSend className='text-3xl'/>
    </button>
    </div>
  )
}
