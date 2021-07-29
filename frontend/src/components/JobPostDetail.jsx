import React, { Component } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";


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
      editJobPost:false,
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
        this.setState({user_id: result.user_id});
        this.setState({ title: result.title });
        this.setState({ company: result.company });
        this.setState({ location: result.location });
        this.setState({ description: result.description });
        this.setState({ requirement: result.requirements.join(",") });
        this.setState({ tags: result.tags.join(",") })
      });
  }


  getUserInfo(userId) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    return fetch(
      `http://localhost:5000/api/v1/users/${userId}`,
      requestOptions
    );
  }

  onEditJobPostClick = () => {
    this.setState({ editJobPost: true });
  }

  render() {
    if (this.state.editJobPost) {
      return <Redirect to= {`/edit_job_post/${this.props.jobPost.id}` } push/>
    }
    const userId = localStorage.getItem("userId");
    return (
      <div className="flex flex-wrap max-w-xl bg-white shadow sm:rounded-lg mt-7 mx-auto">
        <div className="w-full">
          <div className="flex flex-row mt-2 px-2 py-3 mx-3 justify-between">
            <div className="px-4 py-5 sm:px-6">
              {/* Company Name */}
              <h3 className="text-lg leading-6 font-medium text-gray-900">
              {this.state.company}
              </h3>
              {/* Job title */}
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{this.state.title}</p>
            </div>
          <div className="px-4 py-5 sm:px-6 justify-items-end">
            {/* delete */}
            {this.props.jobPost.user_id === userId && (
                <button
                  onClick={this.props.onDeleteJobPost}
                  className="focus:outline-none bg-white transition ease-out duration-300 hover:text-red-500 w-9 h-9 px-2 border-none text-center rounded-full text-gray-400 cursor-pointer mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor">
                  <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            {/* edit */}
            {this.props.jobPost.user_id === userId && (
              <button
                  onClick={this.onEditJobPostClick}
                  className="focus:outline-none bg-white transition ease-out duration-300 hover:text-red-500 w-9 h-9 px-2 border-none text-center rounded-full text-gray-400 cursor-pointer mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 25 25"
                  fill="none"
                  stroke="currentColor"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            )}
          </div>
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
      </div>
    );
  }
}

export default JobPostDetail;
