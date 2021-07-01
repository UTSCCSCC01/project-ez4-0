import React, { Component } from "react";
import JobPost from "./JobPost.jsx";

class AllJobPosting extends Component {
  state = {};
  render() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };

    let response = fetch(
      "http://localhost:5000/api/v1/job-posts",
      requestOptions
    );
    let JSresponse = response.json();
    if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 403 ||
      response.status == 404
    ) {
      return JSresponse.description();
    } else {
      return JSresponse.job_posts.map((post) => (
        <JobPost title={post.title} />
        /* if (post.active == true) {
          <JobPost title={post.title} />
      } */
      ));
    }
  }
}

export default AllJobPosting;
