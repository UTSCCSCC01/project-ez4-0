import React, { setState } from "react";
import ReactPlayer from "react-player/youtube";
import AuthPageHeader from "../../components/AuthPageHeader";
import CourseTimeline from "../../components/CourseTimeline";
import TagBadge from "../../components/TagBadge";

export default class CourseVideosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.id,
      videos: [],
      category: "Learn",
      courseName: "Course Name",
      currIndex: 0,
      enrollmentId: "",
    };
  }

  componentDidMount() {
    this.getCourseVideos();
    this.getEnrollment();
  }

  jumpToVideo = (newIndex, vid) => {
    this.setState({ currIndex: newIndex });
    this.updateEnrollment(vid);
  };

  getCourseVideos() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:5000/api/v1/courses/${this.state.courseId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          videos: result.videos,
          category: result.category,
          courseName: result.name,
        });
      });
  }

  getEnrollment() {
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
        // If already enroled
        const enrollments = result.enrollments;
        if (enrollments) {
          for (let i = 0; i < enrollments.length; i++) {
            if (enrollments[i].course_id === this.props.match.params.id) {
              const idx = enrollments[i].finished.length;
              this.setState({
                enrollmentId: enrollments[i].id,
                currIndex: idx === 0 ? 0 : idx - 1,
              });
              return;
            }
          }
          // Not enroled then enrol :D
          this.enrolCourse();
        }
      });
  }

  enrolCourse() {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: this.props.match.params.id,
      }),
    };
    fetch(
      `http://localhost:5000/api/v1/users/${userId}/enrollments`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ enrollmentId: result.id, currIndex: 0 });
      });
  }

  updateEnrollment(videoId) {
    if (!this.state.enrollmentId) {
      return;
    }
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enrollment_id: this.state.enrollmentId,
        video_id: videoId,
      }),
    };
    fetch(
      `http://localhost:5000/api/v1/users/${userId}/enrollments`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {});
  }

  render() {
    if (this.state.videos.length === 0) {
      return <></>;
    }
    return (
      <div>
        <AuthPageHeader currentTab="Learn" />
        <div className="bg-gray-50 h-screen">
          <div className="flex justify-center pb-20">
            <div
              className="mt-10 flex flex-col md:flex-row justify-center"
              key={this.state.videos[this.state.currIndex].id}
            >
              <div className="py-10 px-8 m-5 bg-white border border-grey-500 rounded-md shadow-md">
                <ReactPlayer
                  className=" md:min-w-forReactPlayer"
                  width="auto"
                  url={this.state.videos[this.state.currIndex].url}
                  controls={true}
                />
                <div className="flex items-baseline mt-5 text-md font-bold text-gray-400 uppercase space-x-4">
                  <div>{this.state.courseName}</div>
                  <div className="text-indigo-400">#{this.state.category}</div>
                </div>
                <div className="mt-0.5 text-2xl font-bold text-gray-700 capitalize">
                  {this.state.videos[this.state.currIndex].name}
                </div>
              </div>
              <div className="mt-5">
                <CourseTimeline
                  videos={this.state.videos}
                  index={this.state.currIndex}
                  jumpToVideo={this.jumpToVideo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
