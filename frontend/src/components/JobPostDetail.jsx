import React, { Component } from "react";
import moment from "moment";

class JobPostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      description: [],
      location: [],
      requirement: [],
      title: [],
      tags: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.jobPost.id;
    const api = `http://localhost:5000/api/v1/job_posts/${id}`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ title: result.title });
        this.setState({ company: result.company });
        this.setState({ location: result.location });
        this.setState({ description: result.description });
        this.setState({ requirement: result.requirements.join(",") });
        this.setState({ tags: result.tags.join(",") })
      });
  }

  render() {
    return (
      <div className="flex flex-wrap max-w-xl bg-white shadow sm:rounded-lg mt-7 mx-auto">
        <div className="px-4 py-5 sm:px-6">
          {/* Company Name */}
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {this.state.company}
          </h3>
          {/* Job title */}
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{this.state.title}</p>
        </div>
        <div className="border-t border-gray-200 w-full">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Job title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.title}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Job location</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.location}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                margotfoster@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Job description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Job Requirement</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.requirement}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tags</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {this.state.tags}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    );
  }
}

export default JobPostDetail;
