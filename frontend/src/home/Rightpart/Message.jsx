import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const alignment = itsMe ? "items-end" : "items-start";
  const bubbleColor = itsMe ? "bg-blue-600 text-white" : "bg-gray-700 text-white";
  const timeAlign = itsMe ? "text-right" : "text-left";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col px-4 py-2 ${alignment}`}>
      <div className={`max-w-[75%] px-4 py-2 rounded-xl shadow-md ${bubbleColor}`}>
        {message.message}
      </div>
      <span className={`text-xs text-gray-400 mt-1 ${timeAlign}`}>
        {formattedTime}
      </span>
    </div>
  );
}

export default Message;
