import logo from "../img/entree-logo-no-text.png";
import SearchBar from "./SearchBar";
import React, { useState } from "react";

const AuthPageHeader = ({ updateResult, currentTab }) => {
  const buttonStyle =
    "px-7 bg-opacity-20 hover:bg-opacity-20 hover:bg-black h-full flex items-center ";
  const buttonStyle1 =
    buttonStyle + (currentTab == "Home" ? "bg-black font-bold" : "font-medium");
  const buttonStyle2 =
    buttonStyle +
    (currentTab == "Learn" ? "bg-black font-bold" : "font-medium");
  const buttonStyle3 =
    buttonStyle +
    (currentTab == "Notifications" ? "bg-black font-bold" : "font-medium");
  const [keyword, setKeyword] = useState("");
  // const [resultPosts, setResultPosts] = useState({});

  const updateInput = async (keyword) => {
    setKeyword(keyword);
  };

  const handleSearch = (e) => {
    // e.preventDefault();
    console.log("SEARCH FOR '%s'", keyword);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:5000/api/v1/posts?keyword=" + keyword,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        updateResult(result["posts"]);
      });
  };

  return (
    <>
      <div className="h-20 bg-indigo-500 flex items-center text-white">
        <img src={logo} className="ml-8 h-7" />
        <div className="mx-12">
          <SearchBar
            input={keyword}
            updateInput={updateInput}
            handleSearch={handleSearch}
          />
        </div>
        <div className={buttonStyle1}>Home</div>
        <div className={buttonStyle2}>Learn</div>
        <div className={buttonStyle3}>Notifications</div>
      </div>
    </>
  );
};

export default AuthPageHeader;
