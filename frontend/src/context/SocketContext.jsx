import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

// Corrected context name
const SocketContext = createContext();

// Custom hook
export const useSocketContext = () => useContext(SocketContext);

// Socket Provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser?.user?._id) {
      // Connect to backend socket server
      const socketInstance = io("http://localhost:4002", {
        query: {
          userId: authUser.user._id,
        },
        reconnection: true, // auto-reconnect
        transports: ["websocket"], // force websocket to avoid polling fallback
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    } else {
      // Cleanup when user logs out
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
