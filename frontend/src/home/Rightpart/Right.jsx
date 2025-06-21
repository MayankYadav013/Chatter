import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Reset conversation when component unmounts
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-slate-900 text-gray-300 h-screen flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Chatuser />
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
}

export default Right;

// Component shown when no chat is selected
const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute top-4 left-4"
      >
        <CiMenuFries className="text-white text-2xl" />
      </label>
      <div className="text-center space-y-3 max-w-md">
        <h1 className="text-xl font-bold text-white">
          Welcome, {authUser.user.fullname}
        </h1>
        <p className="text-gray-400">
          No chat selected. Start a conversation by choosing someone from your
          contacts.
        </p>
      </div>
    </div>
  );
};
