import { LockClosedIcon } from '@heroicons/react/solid'
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../img/entree-logo.png";
import { useState } from 'react';
import {textContent} from 'react';

export default function Post() {
  const [postContent, setPost] = useState("");


  const postDisabled = () => {
    return validateContent(postContent);
  }
  const onPostContentChange = (e) => {
    setPost(e.target.value);
  }

  const validateContent = (postContent) => {
    return postContent.replace(/(^\s*)|(\s*$)/g, '').replace(/[\r\n]/g, '') === '';
  }

  const onPostFormSubmit= (postContent) =>{
    postContent.preventDefault();
  }
  
  const getTag = () =>{
    var tag = postContent.split("#");
    console.log(tag[1]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form className="w-80 min-w-full md:min-w-0 space-y-6" action="#" method="post" onSubmit={onPostFormSubmit}>
            <div>
              <textarea
                rows = "4"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Send Post..."

                onChange={onPostContentChange}
                value={postContent}
              />
            </div>

            <div className="py-2 grid justify-items-end" >  
                <button
                onClick={getTag}
                type="submit"
                disabled={postDisabled()}
                className=" group relative w-1/6 flex justify-center  py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Post
                </button>
            </div>
       </form>
    </div>
  )
}

