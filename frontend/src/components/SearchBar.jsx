import React, { useState } from "react";

const SearchBar = () => {
  return (
    <div className="h-32 p-4 bg-indigo-700 flex place-items-center">
      <div className="px-4 p-2 w-96 rounded-md bg-opacity-20 bg-white flex place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-3"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <text className="text-white">Search by name, content or tag</text>
      </div>
    </div>
  );
};

export default SearchBar;
