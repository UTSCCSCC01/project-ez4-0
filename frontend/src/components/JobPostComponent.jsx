import React, { Component } from "react";

export default class JobPost extends Component {
  getTitle() {
    return this.props.jobPost.title || "";
  }

  getCompany() {
    return this.props.jobPost.location || "";
  }

  getDescription() {
    return this.props.jobPost.description || "No description";
  }

  renderTags() {
    if (this.props.jobPost.tags) {
      return this.props.jobPost.tags.map((t) => (
        <div
          key={t}
          className="text-indigo-500 inline-flex items-center ml-3 mb-0 px-2 py-1 border-2 border-indigo-500 rounded-full text-xs font-normal"
        >
          {t}
        </div>
      ));
    }
    return [];
  }

  render() {
    return (
      <div className="max-w-4xl mx-auto bg-white border-2 mt-3">
        <div className="flex">
          <div className="h-full text-left px-4 py-4 w-full justify-end border-indigo-50">
            <div className="flex items-center flex-wrap">
              <span className="flex flex-col flex-grow pl-4 my-4">
                <span className="font-bold text-md text-indigo-500 hover:text-indigo-600 -mt-4">
                  {this.getTitle()}
                </span>
                <span className="font-normal text-sm text-indigo-300 ">
                  {this.getCompany()}
                </span>
                <span className="font-normal text-sm text-indigo-300">
                  {this.getDescription()}
                </span>
              </span>
            </div>
            <div className="flex items-center flex-wrap">
              {this.renderTags()}
              <span className="text-indigo-800 mr-3 inline-flex items-center ml-auto leading-none text-sm py-1">
                6 days
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
