import React from "react";
import ReactPlayer from "react-player/youtube";
import AuthPageHeader from "../../components/AuthPageHeader";
import CourseTimeline from "../../components/CourseTimeline";

export default class CourseVideosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.id,
      videos: [],
      currIndex: 2,
    };
  }

  componentDidMount() {
    this.getCourseVideos();
  }

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

  renderVideos = () => {
    if (this.state.videos.length === 0) {
      return <></>;
    }
    return (
      <div className="bg-gray-50 h-screen -mt-5">
        <div
          className="mt-10 flex justify-center items-center"
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
          </div>
          <div className="-mt-40">
            <CourseTimeline
              videos={this.state.videos}
              index={this.state.currIndex}
            />
          </div>
        </div>
      </div>
    );
    // return this.state.videos.map((video) => (
    //   <div className="mb-6 flex flex-col justify-center items-center" key={video.id}>
    //     <ReactPlayer
    //       url={video.url}
    //       controls={true}
    //     />
    //     <div className="text-lg">{video.name}</div>
    //   </div>
    // ));
  };

  render() {
    return (
      <div>
        <AuthPageHeader currentTab="Learn" />
        <div className="flex flex-col justify-center mt-3">
          {this.renderVideos()}
        </div>
      </div>
    );
  }
}
