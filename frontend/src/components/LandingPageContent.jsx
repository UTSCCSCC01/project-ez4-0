import illustration from "../img/landing-illustration.png";
import FeaturesSplit from "./FeaturesSplit";
import { ChevronRightIcon } from "@heroicons/react/outline";
export default function LandingPageContent() {
  return (
    <>
      <div className="justify-center mx-auto items-center flex flex-wrap">
        <div>
          <h1
            className="leading-tight md:leading-snug 
          font-cg text-4xl md:text-4xl font-bold text-gray-900"
          >
            <span className="block">Start your business</span>{" "}
            <span className="block">
              with
              <span className="font-cg font-thin text-indigo-500">
                {" "}
                Entre<span className="font-bold">E</span>
              </span>
            </span>
          </h1>
          <a
            href="#"
            className="mt-5 whitespace-nowrap inline-flex 
            items-center justify-center px-4 py-2 border 
            border-transparent rounded-full shadow-sm 
            text-base font-medium text-white 
            bg-indigo-500 hover:bg-indigo-600"
          >
            Get Started{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
        {/* <img src={illustration} /> */}
        {/* <div
          className="md:absolute md:w-1/2 md:inset-y-40 md:right-40
      lg:absolute lg:inset-y-40 lg:right-0 lg:w-1/2"
        >
        </div> */}

        <img
          className="ml-16 mt-10 lg:mt-0 w-80 lg:w-96 "
          src={illustration}
          alt=""
        />
      </div>
      <div className="justify-center mx-auto flex my-40">
        <FeaturesSplit />
      </div>
    </>
  );
}
