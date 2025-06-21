import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div className="px-4 pt-3">
      <h1 className="text-white text-lg font-bold mb-2">Messages</h1>
      <div className="space-y-1 overflow-y-auto" style={{ maxHeight: "calc(84vh - 20vh)" }}>
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
