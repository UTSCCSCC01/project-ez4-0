import React, { Component } from "react";

class CourseProgessReport extends Component {
  state = {};
  render() {
    return (
      <div className="flex-col mx-auto justify-self-center max-w-xl mt-2">
        <div className="mb-4">
          <div className="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div className="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              className="bg-blue-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "45%" }}
            >
              45%
            </div>
          </div>
          <div className="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div className="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              className="bg-green-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "55%" }}
            >
              55%
            </div>
          </div>
          <div className="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div className="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              className="bg-yellow-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "65%" }}
            >
              65%
            </div>
          </div>
          <div className="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div className="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              className="bg-red-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "75%" }}
            >
              75%
            </div>
          </div>
          <div className="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseProgessReport;
