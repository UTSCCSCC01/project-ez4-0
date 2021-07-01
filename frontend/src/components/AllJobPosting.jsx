import React, { Component } from "react";
import JobPost from "./JobPost.jsx";

class AddJobPosting extends Component {
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
    let JSresponse = reponse.json();
    if (
      reponse.status == 400 ||
      reponse.status == 401 ||
      reponse.status == 403 ||
      reponse.status == 404
    ) {
      return JSresponse.description();
    } else {
      return JSresponse.job_posts.map((post) => (
        <Jobpost title={title} />
        /* if (post.active == true) {
          <Jobpost title={title} />
      } */
      ));
    }
  }
}

export default AddJobPosting;
