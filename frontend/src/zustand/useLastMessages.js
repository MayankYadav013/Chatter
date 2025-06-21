import { create } from "zustand";

const useLastMessages = create((set) => ({
  lastMessages: {}, // { userId: { message, timestamp, read } }

  setLastMessage: (userId, messageData) =>
    set((state) => ({
      lastMessages: {
        ...state.lastMessages,
        [userId]: {
          ...messageData,
          read: false,
        },
      },
    })),

  markAsRead: (userId) =>
    set((state) => ({
      lastMessages: {
        ...state.lastMessages,
        [userId]: {
          ...state.lastMessages[userId],
          read: true,
        },
      },
    })),
}));

export default useLastMessages;
