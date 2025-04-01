import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function Search() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Add search functionality here (API call or filter logic)
  };

  return (
    <div className='h-[10vh]'>
      <div className='px-6 py-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3'>
          <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
            <input
              type="text"
              className="grow outline-none bg-transparent text-white"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
          </label>
          <button type="submit" className="p-3 rounded-full bg-gray-900 hover:bg-gray-700 duration-300">
            <FaSearch className="text-2xl text-gray-300" />
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Search;
