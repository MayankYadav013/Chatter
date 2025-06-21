import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../../public/user.jpg";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(selectedConversation._id);
  const statusColor = isOnline ? "bg-green-500" : "bg-red-500";
  const statusText = isOnline ? "Online" : "Offline";

  return (
    <div className="relative flex items-center justify-between p-3 h-[8%] bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
      <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
        <CiMenuFries className="text-white text-2xl" />
      </label>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${statusColor} border-2 border-gray-900`} />
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={profile} alt="User" />
            </div>
          </div>
        </div>

        <div className="text-white">
          <h1 className="text-lg font-semibold">{selectedConversation.fullname}</h1>
          <p className="text-sm text-gray-400">{statusText}</p>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
