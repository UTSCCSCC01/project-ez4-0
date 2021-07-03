import React, { Component } from "react";

class CourseProgessReport extends Component {
  state = {};
  render() {
    return (
      <div class="flex-col mx-auto justify-self-center max-w-xl mt-2">
        <div class="mb-4">
          <div class="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div class="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              class="bg-blue-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "45%" }}
            >
              45%
            </div>
          </div>
          <div class="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div class="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              class="bg-green-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "55%" }}
            >
              55%
            </div>
          </div>
          <div class="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div class="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              class="bg-yellow-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "65%" }}
            >
              65%
            </div>
          </div>
          <div class="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-lg mb-2">UTSC CSCC01 TOUGH!</div>
          <div class="flex shadow self-center w-full rounded-lg bg-gray-100 mb-2">
            <div
              class="bg-red-500 text-sm w-auto font-bold rounded-lg leading-4 py-1 text-center text-white"
              style={{ width: "75%" }}
            >
              75%
            </div>
          </div>
          <div class="text-gray-500 text-md ">
            You completed nearly half of the course!{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseProgessReport;
