import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = ({ input, updateInput, handleSearch }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="pt-6 px-4 mx-auto rounded-md bg-opacity-20 bg-white flex place-items-center md:w-1/2">
      <SearchIcon className="h-5 bg-white" />
      <input
        className=" flex-auto mx-auto ml-1 my-auto p-2 bg-white rounded shadow-xl"
        value={input}
        placeholder={"Type here to search!"}
        onChange={(e) => updateInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
