import React, { Component } from "react";
import moment from "moment";

class JobPostDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      description: [],
      location: [],
      requiremet: [],
      title: [],
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
        .then(result => {
            this.setState({ title: result.title });
            this.setState({ company: result.company });
            this.setState({ location: result.location });
            this.setState({ description: result.description });
            this.setState({ requirement: result.requirement });
        });
  }

  render(){

    return(
        <div class="flex flex-wrap max-w-xl bg-white shadow sm:rounded-lg mt-3 mx-auto">
            <div class="px-4 py-5 sm:px-6">
                {/* Company Name */}
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                {this.state.company}
                </h3>
                {/* Job title */}
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {this.state.title}
                </p>
            </div>
            <div class="border-t border-gray-200">
                <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Job title
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {this.state.title}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    Job location
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {this.state.location}
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    Contact email
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    margotfoster@example.com
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    Salary expectation
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    $120,000
                    </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    Job description
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {this.state.description}
                    </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                    Job Requirement
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {this.state.requirement}
                    </dd>
                </div>
                </dl>
            </div>
            </div>
    );
  }
}

export default JobPostDetail; 