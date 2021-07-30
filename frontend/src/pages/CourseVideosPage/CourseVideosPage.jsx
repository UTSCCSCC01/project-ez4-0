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
      currIndex: 0,
    };
  }

  componentDidMount() {
    this.getCourseVideos();
  }

  jumpToVideo = (newIndex) => {
    console.log("jump");
    this.setState({ currIndex: newIndex });
    return 0;
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
        console.log(result);
        this.setState({ videos: result.videos });
      });
  }

  render() {
    if (this.state.videos.length === 0) {
      return <></>;
    }
    return (
      <div>
        <AuthPageHeader currentTab="Learn" />
        <div className="flex flex-col justify-center mt-3">
          <div className="bg-gray-50 h-screen -mt-5">
            <div
              className="mt-20 flex justify-center"
              key={this.state.videos[this.state.currIndex].id}
            >
              <div className="py-10 px-8 bg-white border border-grey-500 rounded-md shadow-md">
                <ReactPlayer
                  url={this.state.videos[this.state.currIndex].url}
                  controls={true}
                />
                <div className="mt-5 text-2xl font-bold text-gray-600 ">
                  {this.state.videos[this.state.currIndex].name}
                </div>
                <div className="flex mt-2 space-x-2">
                  <TagBadge isSelected={true} tagName="Speech" />
                  <TagBadge isSelected={true} tagName="Learn" />
                  <TagBadge isSelected={true} tagName="Ideas" />
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
