import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = ({ input, updateInput, handleSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="md:w-96 px-4 p-2 rounded-md bg-opacity-20 bg-white flex place-items-center">
      <SearchIcon className="h-5" />
      <input
        className="focus:outline-none bg-transparent border-0 ring-0
          block w-full mx-1 px-2 border-gray-300 rounded-md
          text-white placeholder-white text-sm"
        value={input}
        placeholder={"Search by name, content or tag"}
        onChange={(e) => updateInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
