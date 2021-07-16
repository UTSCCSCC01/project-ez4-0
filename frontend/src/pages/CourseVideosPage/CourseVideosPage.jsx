import React from 'react';
import ReactPlayer from 'react-player/youtube';
import AuthPageHeader from '../../components/AuthPageHeader';

export default class CourseVideosPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: this.props.match.params.id,
      videos: [],
    }
  }

  componentDidMount() {
    this.getCourseVideos();
  }

  getCourseVideos() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/courses/${this.state.courseId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ videos: result.videos });
      });
  }

  renderVideos = () => {
    return this.state.videos.map((video) => (
      <div className="mb-6 flex flex-col justify-center items-center" key={video.id}>
        <ReactPlayer
          url={video.url}
          controls={true}
        />
        <div className="text-lg">{video.name}</div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <AuthPageHeader currentTab="Learn"/>
        <div className="flex flex-col justify-center mt-3">
          {this.renderVideos()}
        </div>
      </div>
    )
  }
}
