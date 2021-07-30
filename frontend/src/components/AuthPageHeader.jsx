import logo from "../img/entree-logo-no-text.png";
import SearchBar from "./SearchBar";
import React, { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import defaultAvatar from "../img/default-avatar.png";
import { SearchIcon, MenuIcon, BellIcon } from "@heroicons/react/outline";
import { Redirect, Link } from "react-router-dom";

const AuthPageHeader = ({ updateResult, currentTab }) => {
  const buttonStyle =
    "transition ease-out duration-300 mx-1 lg:mx-2 py-2 px-5 rounded-md bg-opacity-20 hover:bg-opacity-20 hover:bg-black h-auto flex items-center ";
  const buttonStyle1 =
    buttonStyle +
    (currentTab === "Home" ? "bg-black font-bold" : "font-medium");
  const buttonStyle2 =
    buttonStyle +
    (currentTab === "Learn" ? "bg-black font-bold" : "font-medium");
  const buttonStyle3 =
    buttonStyle +
    (currentTab === "Jobs" ? "bg-black font-bold" : "font-medium");
  const [keyword, setKeyword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [logout, setLogout] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTags, setSearchTags] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const updateInput = async (keyword) => {
    setKeyword(keyword);
  };
  const menuItemStyle =
    "px-7 py-2 flex items-center bg-black bg-opacity-0 hover:bg-opacity-20";

  const userId = localStorage.getItem("userId");

  const handleSearch = (e) => {
    setIsSearch(true);
    if (keyword.indexOf("#") === -1) {
      setSearchKeyword(keyword);
    } else {
      const tags = keyword.split(",").map((t) => {
        return t.replace("#", "").trim();
      });
      setSearchTags(tags.join(","));
    }
  };

  const getUserInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/users/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAvatar(result.avatar);
        setFirstName(result.first_name);
        setLastName(result.last_name);
      });
  };

  const onLogoutClick = () => {
    localStorage.removeItem("userId");
    setLogout(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (logout) {
    return <Redirect to="/login" />;
  }

  if (isSearch) {
    if (searchTags) {
      return <Redirect to={`/search_results?tags=${searchTags}`} push />;
    }
    return <Redirect to={`/search_results?keyword=${searchKeyword}`} push />;
  }

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
                      <div className="font-medium pb-5">
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Home</a>
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Learn</a>
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <a className={menuItemStyle}>Jobs</a>
                        <div className="bg-white h-px opacity-30 inset-0 mx-5" />
                        <div className="flex flex-row ml-7 mt-5 mr-6 justify-between">
                          <div className="font-medium text-sm flex items-center">
                            <Link to={`/personal_profile/${userId}`} push>
                              <img
                                src={avatar || defaultAvatar}
                                className="rounded-full w-7 h-7 mr-4 cursor-pointer"
                              />
                            </Link>
                            <div>
                              {firstName} {lastName}
                            </div>
                          </div>
                          <div
                            onClick={onLogoutClick}
                            className="cursor-pointer p-2 ml-4 mt-px text-xs transition ease-out duration-300 hover:bg-indigo-700 rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </div>
            )}
          </Popover>
          <div className="flex flex-grow justify-center">
            <img src={logo} className="h-6 mx-5" />
          </div>
          <Popover className="px-5 flex content-center">
            <Popover.Button className="">
              <BellIcon className="h-6 w-6" />
            </Popover.Button>
            <Popover.Panel>Panel</Popover.Panel>
          </Popover>
        </div>
        <div className="hidden md:flex w-screen items-center">
          <img src={logo} className="mx-8 h-7" />
          <SearchIcon className="h-6 w-6 md:hidden" />
          <SearchBar
            input={keyword}
            updateInput={updateInput}
            handleSearch={handleSearch}
          />
          <div className="lg:-ml-12 flex flex-grow justify-center">
            <Link to="/dashboard" className={buttonStyle1}>
              Home
            </Link>
            <Link to="/courses" className={buttonStyle2}>
              Learn
            </Link>
            <Link to="/all_jobs" className={buttonStyle3}>
              Jobs
            </Link>
          </div>
          <div className="mr-6 font-medium text-sm flex items-center">
            <Link to={`/personal_profile/${userId}`}>
              <img
                src={avatar || defaultAvatar}
                className="rounded-full w-7 h-7 mr-4 cursor-pointer"
              />
            </Link>
            <div>
              {firstName} {lastName}
            </div>
            <div
              onClick={onLogoutClick}
              className="cursor-pointer p-2 ml-4 mt-px text-xs transition ease-out duration-300 hover:bg-indigo-700 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPageHeader;
