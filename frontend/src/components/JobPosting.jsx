import React, { Component } from "react";

class JobPosting extends Component {
  render() {
    return (
      <div class="mx-auto bg-white border-t-2">
        <div class="flex ">
          <div class="h-full text-left px-4 py-4 w-full justify-end border-b-2 border-indigo-50">
            <a to="jobdet" class="flex items-center flex-wrap">
              <img
                alt="testimonial"
                class="inline-block object-cover object-center w-16 h-16 mb-4 bg-indigo-100 rounded"
                src={this.props.img}
              />{" "}
              <span class="flex flex-col flex-grow pl-4">
                <span class="font-bold text-xl text-indigo-500 hover:text-indigo-600 -mt-4">
                  Software developer{" "}
                </span>
                <span class="text-sm text-indigo-300 ">IBM</span>
                <span class="text-sm text-indigo-300">
                  Location: Lomndon sdf
                </span>
              </span>
            </a>
            <div class="flex items-center flex-wrap ">
              <a
                to="jobdet"
                class="text-indigo-500 inline-flex items-center mb-0 px-2 py-1 border-2 border-indigo-500 rounded-full text-sm"
              >
                Remote Full Time
              </a>
              <span class="text-indigo-800 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 px-2 bg-yellow-500 rounded-full">
                New
              </span>
              <span class="text-indigo-400 inline-flex items-center leading-none text-sm">
                6 days
              </span>
            </div>
          </div>
        </div>
        <div class="flex ">
          <div class="h-full text-left px-4 py-4 w-full justify- border-b-2 border-indigo-50">
            <a to="jobdet" class="flex items-center flex-wrap">
              <img
                alt="testimonial"
                class="inline-block object-cover object-center w-16 h-16 mb-4 bg-indigo-100 rounded"
                src={this.props.img}
              />{" "}
              <span class="flex flex-col flex-grow pl-4">
                <span class="font-bold text-xl text-indigo-500 hover:text-indigo-600 -mt-4">
                  Software developer{" "}
                </span>
                <span class="text-sm text-indigo-300 ">IBM</span>
                <span class="text-sm text-indigo-300">
                  Location: Lomndon sdf
                </span>
              </span>
            </a>
            <div class="flex items-center flex-wrap ">
              <a
                to="jobdet"
                class="text-indigo-500 inline-flex items-center mb-0 px-2 py-1 border-2 border-indigo-500 rounded-full text-sm"
              >
                Remote Full Time
              </a>
              <span class="text-indigo-800 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 px-2 bg-yellow-500 rounded-full">
                New
              </span>
              <span class="text-indigo-400 inline-flex items-center leading-none text-sm">
                6 days
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobPosting;
