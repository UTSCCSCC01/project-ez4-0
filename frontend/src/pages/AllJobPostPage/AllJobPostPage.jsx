import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader.jsx";
import JobPostDetail from "../../components/JobPostDetail.jsx";

export default class AllJobPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_posts: [],
      makeJobPost: false,
    };
  }

  componentDidMount() {
    this.getJobPosts();
  }

  getJobPosts() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/api/v1/job_posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ job_posts: result.job_posts });
      });
  }

  onMakeJobPostClick = () => {
    this.setState({ makeJobPost: true });
  }

  renderJobPosts() {
    return this.state.job_posts.map((post) => {
      if (post.active === true) {
        return <JobPostDetail key={post.id} jobPost={post} />;
      }
    });
  }

  render() {
    if (this.state.makeJobPost) {
      return <Redirect to="/make_job_post" push/>
    }
    return (
      <div>
        <AuthPageHeader
          currentTab="Jobs"
        />
        <div>
          <div class="flex justify-center my-3">
            <button
              onClick={this.onMakeJobPostClick}
              className="customize-post-box-post-btn group relative w-1/3 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Make a Job Post
            </button>
          </div>
          {this.renderJobPosts()}
        </div>
      </div>
    );
  }
}
