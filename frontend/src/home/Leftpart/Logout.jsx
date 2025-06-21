import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[10vh] border-t border-gray-800 px-4 flex items-center">
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
      >
        <BiLogOutCircle className="text-2xl" />
        <span>{loading ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
}

export default Logout;
