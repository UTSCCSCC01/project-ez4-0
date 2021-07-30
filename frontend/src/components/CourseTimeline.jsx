import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";

const TimelineComponent = ({
  title,
  timelineState,
  videoIndex,
  jumpToVideo,
}) => {
  if (timelineState === 0) {
    return (
      <div className="pt-4">
        <Link
          className="flex items-center -mt-2"
          onClick={() => jumpToVideo(videoIndex)}
        >
          <div
            className="w-3 h-3 rounded-full 
      border-3 bg-gray-50 absolute border-gray-300 ml-0.5"
          />
          <div className="hover:text-gray-400 text-left text-gray-300 h-12 w-48 leading-snug flex items-center text-sm font-medium ml-8">
            <div>{title}</div>
          </div>
        </Link>
      </div>
    );
  } else if (timelineState === 1) {
    return (
      <div className="">
        <Link
          className="flex items-center -mt-2"
          onClick={() => jumpToVideo(videoIndex)}
        >
          <div
            className="w-3 h-3 rounded-full 
    border-3 bg-gray-50 absolute border-indigo-500 ml-0.5"
          />
          <div className="hover:text-indigo-600 text-indigo-500 h-12 w-48 leading-snug flex items-center text-sm font-medium ml-8">
            <div>{title}</div>
          </div>
        </Link>
      </div>
    );
  } else if (timelineState === 2) {
    return (
      <div className="">
        <Link
          className="flex items-center -mt-2"
          onClick={() => jumpToVideo(videoIndex)}
        >
          <div
            className="w-4 h-4 rounded-full 
border-4 bg-gray-50 absolute border-indigo-500 z-30"
          />
          <div className="hover:text-indigo-600 text-indigo-500 h-12 w-48 leading-snug flex items-center text-sm font-bold ml-8">
            <div>{title}</div>
          </div>
        </Link>
      </div>
    );
  }
};

const CourseTimeline = ({ videos, index, jumpToVideo }) => {
  if (!videos) {
    return <></>;
  }
  const temp = videos.slice(0, -1);
  const last = videos.slice(-1)[0];
  const classNames = index === videos.length - 1 ? "relative pt-4" : "relative";
  return (
    <div className="relative ml-12">
      <div className="relative space-y-4">
        <div className="w-0.75 ml-1.75 h-full top-5 bg-indigo-500 absolute"></div>
        {temp.map((video) =>
          index === videos.indexOf(video) ? (
            <TimelineComponent
              title={video.name}
              timelineState={2}
              videoIndex={videos.indexOf(video)}
              jumpToVideo={jumpToVideo}
              id={video.id}
            />
          ) : index > videos.indexOf(video) ? (
            <TimelineComponent
              title={video.name}
              timelineState={1}
              jumpToVideo={jumpToVideo}
              videoIndex={videos.indexOf(video)}
              id={video.id}
            />
          ) : (
            <></>
          )
        )}
      </div>
      <div className="relative">
        <div className="w-0.75 ml-1.75 h-full bottom-5 bg-gray-300 absolute"></div>
        {temp.map((video) =>
          index < videos.indexOf(video) ? (
            <TimelineComponent
              title={video.name}
              timelineState={0}
              videoIndex={videos.indexOf(video)}
              jumpToVideo={jumpToVideo}
              id={video.id}
            />
          ) : (
            <></>
          )
        )}
      </div>
      <div className={classNames}>
        {index === videos.length - 1 ? (
          <div>
            {index === 0 ? (
              <></>
            ) : (
              <div className="w-0.75 ml-1.75 h-full bottom-5 bg-indigo-500 absolute"></div>
            )}
            <TimelineComponent
              title={last.name}
              timelineState={2}
              videoIndex={videos.indexOf(last)}
              jumpToVideo={jumpToVideo}
            />
          </div>
        ) : (
          <div>
            <div className="w-0.75 ml-1.75 h-full bottom-5 bg-gray-300 absolute"></div>
            <TimelineComponent
              title={last.name}
              timelineState={0}
              videoIndex={videos.indexOf(last)}
              jumpToVideo={jumpToVideo}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTimeline;
