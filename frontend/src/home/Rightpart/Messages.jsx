import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // Listen to incoming messages

  const lastMsgRef = useRef();

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-900 rounded-md">
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div key={message._id} ref={isLast ? lastMsgRef : null}>
              <Message message={message} />
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full text-gray-400 text-sm">
          Say hi 👋 to start the conversation!
        </div>
      )}
    </div>
  );
}

export default Messages;
