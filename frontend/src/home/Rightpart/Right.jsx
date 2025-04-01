import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Typesend from './typesend'

function Right() {
  return (
    <div className="w-[70%] text-gray-300 bg-slate-900">
      <Chatuser/>
      <div style={{minHeight:"calc(92vh - 8vh)"}}>
      <Messages/>
      </div>
      <Typesend/>
    </div>
  )
}

export default Right
