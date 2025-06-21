import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import profile from "../../../public/user.jpg";
import { motion } from "framer-motion";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer px-4 py-3 rounded-lg mb-1 transition-colors duration-300 ${
        isSelected ? "bg-slate-800" : "hover:bg-slate-700"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <img src={profile} alt="User Avatar" className="w-full h-full object-cover" />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold">{user.fullname}</span>
          <span className="text-gray-400 text-sm">{user.email}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default User;
