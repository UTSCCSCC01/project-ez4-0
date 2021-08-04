import React, { Component } from "react";
import { Link } from "react-router-dom";

class CourseProgessReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: [],
    };
  }

  componentDidMount() {
    this.getEnrollments();
  }

  getEnrollments() {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:5000/api/v1/users/${userId}/enrollments`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.enrollments) {
          result.enrollments.forEach((e) => {
            this.getCourse(e.finished, e.course_id);
          });
        }
      });
  }

  getCourse(finished, courseId) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/courses/${courseId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const progress = this.state.progress;
        progress.push({
          videos: result.videos,
          courseName: result.name,
          finished,
          courseId,
        });
        this.setState({ progress });
      });
  }

  renderProgress() {
    return this.state.progress.map(
      ({ finished, videos, courseId, courseName }) => {
        let percent = (finished.length / videos.length) * 100;
        if (percent === 0) {
          return (
            <Link to={`/course_videos/${courseId}`} key={courseId}>
              <div className="mb-4 hover:bg-gray-200 p-2 cursor-pointer rounded-md transition ease-out duration-300">
                <div className="font-normal text-md mb-2 text-gray-700">
                  {courseName}
                </div>
                <div className="flex shadow text-gray-700 font-normal text-sm self-center w-full rounded-lg bg-gray-100 mb-2 justify-center">
                  No Progress Yet
                </div>
              </div>
            </Link>
          );
        }
        return (
          <Link to={`/course_videos/${courseId}`} key={courseId}>
            <div className="mb-4 hover:bg-gray-200 p-2 cursor-pointer rounded-md transition ease-out duration-300">
              <div className="font-bold text-sm mb-2 text-gray-500">
                {courseName}
              </div>
              <div className="flex shadow self-center w-full rounded-lg bg-gray-100">
                <div
                  className="bg-indigo-400 text-xs w-auto font-bold rounded-md leading-4 py-0.5 text-center text-white"
                  style={{ width: `${percent}%` }}
                >
                  {percent}%
                </div>
              </div>
            </div>
          </Link>
        );
      }
    );
  }

  render() {
    return (
      <div className="p-4 flex-col mx-auto border rounded-md shadow-sm bg-white justify-self-center max-w-xl mt-2">
        {this.renderProgress()}
      </div>
    );
  }
}

export default CourseProgessReport;
