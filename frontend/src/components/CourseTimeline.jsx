import React, { Component } from "react";
import { Link } from "react-router-dom";

const TimelineComponent = ({ title, timelineState }) => {
  if (timelineState === 0) {
    return (
      <div>
        <div className="w-0.75 h-8 bg-gray-300 ml-1.75 -mt-2"></div>

        <Link to="/" className="flex items-center -mt-2">
          <div
            className="w-3 h-3 rounded-full 
      border-3 border-gray-300 ml-0.5"
          />
          <div className="text-gray-300 font-medium ml-4">{title}</div>
        </Link>
      </div>
    );
  } else if (timelineState === 1) {
    return (
      <div>
        <div className="w-0.75 h-8 bg-indigo-500 ml-1.75 -mt-2"></div>

        <Link to="/" className="flex items-center -mt-2">
          <div
            className="w-3 h-3 rounded-full 
    border-3 border-indigo-500 ml-0.5"
          />
          <div className="text-indigo-500 font-medium ml-4">{title}</div>
        </Link>
      </div>
    );
  } else if (timelineState === 2) {
    return (
      <div>
        <div className="w-0.75 h-8 bg-indigo-500 ml-1.75 -mt-2"></div>

        <Link to="/" className="flex items-center -mt-2">
          <div
            className="w-4 h-4 rounded-full 
border-4 border-indigo-500"
          />
          <div className="text-indigo-500 font-bold ml-4">{title}</div>
        </Link>
      </div>
    );
  }
};

const CourseTimeline = ({ videos, index }) => {
  if (!videos) {
    return <></>;
  }
  const temp = videos.slice(1);
  if (index == 0) {
    return (
      <div className="ml-16">
        <Link to="/" className="flex items-center -mt-2">
          <div
            className="w-4 h-4 rounded-full 
border-4 border-indigo-500"
          />
          <div className="text-indigo-500 font-bold ml-4">{videos[0].name}</div>
        </Link>
        {temp.map((video) => (
          <TimelineComponent
            title={video.name}
            timelineState={0}
            id={video.id}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="ml-16">
        <Link to="/" className="flex items-center -mt-2">
          <div
            className="w-3 h-3 rounded-full 
    border-3 border-indigo-500 ml-0.5"
          />
          <div className="text-indigo-500 font-medium ml-4">
            {videos[0].name}
          </div>
        </Link>
        {temp.map(
          (video) =>
            // <div>
            index === videos.indexOf(video) ? (
              <TimelineComponent
                title={video.name}
                timelineState={2}
                id={video.id}
              />
            ) : index > videos.indexOf(video) ? (
              <TimelineComponent
                title={video.name}
                timelineState={1}
                id={video.id}
              />
            ) : (
              <TimelineComponent
                title={video.name}
                timelineState={0}
                id={video.id}
              />
            )
          // </div>
        )}
      </div>
    );
  }
};

export default CourseTimeline;
