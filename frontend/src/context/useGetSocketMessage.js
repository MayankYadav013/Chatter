import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation";
import useLastMessages from "../zustand/useLastMessages";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessage, selectedConversation } = useConversation();
  const { setLastMessage } = useLastMessages();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessage([...messages, newMessage]);

      const from = newMessage.senderId;
      const isCurrent = selectedConversation?._id === from;

      setLastMessage(from, {
        message: newMessage.message,
        timestamp: newMessage.createdAt,
        read: isCurrent,
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessage, selectedConversation]);
};

export default useGetSocketMessage;
