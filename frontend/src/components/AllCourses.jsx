import { useState,useRef } from "react";
import "../css/PostBoxComponent.css";

export default function AllCourses({ onCreatePost }) {

  return (
    <div className="bg-gray-50">

  <div>
      <div class="max-w-6xl mx-auto px-5 py-24 ">
        <div class="flex flex-wrap w-full mb-8 flex-col items-center text-center">
          <h1 class=" title-font mb-2 text-4xl font-extrabold leading-10 tracking-tight text-left sm:text-5xl sm:leading-none md:text-6xl"> All Courses</h1>
        </div>

        <div class="flex flex-wrap -m-4">
          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/354"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 1 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/355"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 2 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/356"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 3 </h2>           
            </div>
          </div>
        </div>

        <div class="flex flex-wrap -m-4">
          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/352"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 4 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/351"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 5 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/350"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 6 </h2>           
            </div>
          </div>
        </div>

        <div class="flex flex-wrap -m-4">
          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/360"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 7 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/361"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 8 </h2>           
            </div>
          </div>

          <div class="xl:w-1/3 md:w-1/2 p-10">
            <div class="border border-gray-300 p-3 rounded-lg">
              <img
                  className="rounded"
                  src="https://picsum.photos/536/362"
                  alt="User post image"
              />
              <h2 class="text-lg pt-2 font-medium title-font">Course 9 </h2>           
            </div>
          </div>
        </div>
      
      </div>

</div>
    </div>
  );
}