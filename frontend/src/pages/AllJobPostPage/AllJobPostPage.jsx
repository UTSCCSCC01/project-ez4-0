import React, { Component } from "react";
import AuthPageHeader from "../../components/AuthPageHeader.jsx";
import JobPostDetail from "../../components/JobPostDetail.jsx";

export default class AllJobPostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

      job_posts: [],

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

 
  renderJobPosts() {
    return this.state.job_posts.map((post) => {
      if (post.active === true) {
        return <JobPostDetail key={post.id} jobPost={post} />;
      }
    });
  }



  render() {
    return (
      <div>
        <AuthPageHeader
          updateResult={this.onSearch}
          currentTab={this.state.currentTab}
        />
            <div className="">
              {this.renderJobPosts()}
              
            </div>
          </div>
        

    );
  }
}
