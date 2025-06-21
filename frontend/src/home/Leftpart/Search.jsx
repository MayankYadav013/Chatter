import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] px-4 py-2 border-b border-gray-800 bg-inherit">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="flex items-center w-full bg-gray-800 text-white rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <FaSearch className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent w-full outline-none placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}

export default Search;
