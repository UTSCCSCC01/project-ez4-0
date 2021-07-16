import React, { Component } from "react";
import MakeJobPost from "../../components/MakeJobPost";
import AuthPageHeader from "../../components/AuthPageHeader";

class MakeJobPostPage extends Component {
  state = {};

  createJobPost = (
    title,
    location,
    company,
    description,
    requirement,
    tags
  ) => {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active: true,
        company: company,
        description: description,
        location: location,
        requirement: [requirement],
        tags: tags,
        title: title,
        user_id: userId,
      }),
    };
    const api = `http://localhost:5000/api/v1/job_posts`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        console.log("Job Post created successfully!");
      }
    });
  };

  render() {
    return (
      <div>
        <AuthPageHeader currentTab="Jobs"/>
        <MakeJobPost onCreateJobPost={this.createJobPost} />
      </div>
    );
  }
}

export default MakeJobPostPage;
