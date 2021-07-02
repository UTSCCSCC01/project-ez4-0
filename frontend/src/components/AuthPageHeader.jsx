import logo from "../img/entree-logo-no-text.png";
import SearchBar from "./SearchBar";
import React, { useState, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { SearchIcon, MenuIcon, BellIcon } from "@heroicons/react/outline";

const AuthPageHeader = ({ updateResult, currentTab }) => {
  const buttonStyle =
    "mx-2 py-2 px-5 rounded-md bg-opacity-20 hover:bg-opacity-20 hover:bg-black h-auto flex items-center ";
  const buttonStyle1 =
    buttonStyle +
    (currentTab === "Home" ? "bg-black font-bold" : "font-medium");
  const buttonStyle2 =
    buttonStyle +
    (currentTab === "Learn" ? "bg-black font-bold" : "font-medium");
  const buttonStyle3 =
    buttonStyle +
    (currentTab === "Notifications" ? "bg-black font-bold" : "font-medium");
  const [keyword, setKeyword] = useState("");
  // const [resultPosts, setResultPosts] = useState({});

  const updateInput = async (keyword) => {
    setKeyword(keyword);
  };
  const menuItemStyle =
    "px-7 py-2 flex items-center bg-black bg-opacity-0 hover:bg-opacity-20";
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
        updateResult(result.posts);
        // updateResult();
      });
  };

  return (
    <>
      <div className="h-16 md:h-20 bg-indigo-500 flex items-center text-white">
        <div className="flex items-center w-screen md:hidden">
          <Popover className="px-5">
            {({ open }) => (
              <div className="flex items-center">
                <Popover.Button>
                  <MenuIcon className="h-6 w-6" />
                </Popover.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-200 ease-out"
                  enterFrom="opacity-0 scale-y-75"
                  enterTo="opacity-100 scale-y-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-y-100"
                  leaveTo="opacity-0 scale-y-75"
                >
                  <Popover.Panel
                    className="absolute z-10 top-16 inset-x-0
              transition transform origin-top md:hidden"
                  >
                    <div
                      className="shadow-lg ring-1
                 ring-black ring-opacity-5 bg-indigo-600"
                    >
                      <div className="p-5">
                        <SearchBar
                          input={keyword}
                          updateInput={updateInput}
                          handleSearch={handleSearch}
                        />
                      </div>
                      <div className="font-medium pb-3">
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Home</a>
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Learn</a>
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Jobs</a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            )}
          </Popover>
          <div className="flex flex-grow justify-center">
            <img src={logo} className="h-6 px-5" />
          </div>
          <Popover className="px-5 flex content-center">
            <Popover.Button className="">
              <BellIcon className="h-6 w-6" />
            </Popover.Button>
            <Popover.Panel>Panel</Popover.Panel>
          </Popover>
        </div>
        <div className="hidden md:flex items-center">
          <img src={logo} className="mx-8 h-7" />
          <SearchIcon className="h-6 w-6 md:hidden" />
          <SearchBar
            input={keyword}
            updateInput={updateInput}
            handleSearch={handleSearch}
          />
          <div className="flex ml-5">
            <a className={buttonStyle1}>Home</a>
            <a className={buttonStyle2}>Learn</a>
            <a className={buttonStyle3}>Notifications</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPageHeader;
