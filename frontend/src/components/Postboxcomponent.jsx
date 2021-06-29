import { LockClosedIcon } from '@heroicons/react/solid'
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../img/entree-logo.png";


export default function Post() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <form className="max-w-screen-md space-y-6" action="#" method="post">
            <div>
              <textarea
                rows = "4"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Send Post..."
              />
            </div>

            <div className="py-2 grid justify-items-end" >  
                <button
                type="submit"
                className=" group relative w-1/6 flex justify-center  py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Post
                </button>
            </div>
       </form>
    </div>
  )
}