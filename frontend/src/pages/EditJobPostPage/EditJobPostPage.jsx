import React, { Component } from "react";
import MakeJobPost from "../../components/MakeJobPost";
import AuthPageHeader from "../../components/AuthPageHeader";
import EditJobPost from "../../components/EditJobPost";

class EditJobPostPage extends Component {
  state = {};

  updateJobPost = (
    title,
    location,
    company,
    description,
    requirement,
    tags
  ) => {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        active: true,
        company: company,
        description: description,
        location: location,
        requirements: [requirement],
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
        <EditJobPost onUpdateJobPost={this.updateJobPost} />
      </div>
    );
  }
}

export default EditJobPostPage;
