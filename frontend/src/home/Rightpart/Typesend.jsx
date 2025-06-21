import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg outline-none border border-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`p-2 rounded-full transition ${
            loading || !message.trim()
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <IoSend className="text-white text-xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
