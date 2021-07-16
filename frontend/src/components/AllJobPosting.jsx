import React, { Component } from "react";
import JobPost from "./JobPost.jsx";

class AllJobPosting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job_posts: [],
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/api/v1/job_posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ job_posts: result.job_posts });
      });
  }

  render() {
    return (
      <div>
        {this.state.job_posts.map((post) => {
          if (post.active === true) {
            return <JobPost key={post.id} title={post.title} />;
          }
        })}
      </div>
    );
  }
}

export default AllJobPosting;
