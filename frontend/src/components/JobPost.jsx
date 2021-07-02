import React, { Component } from "react";

class JobPost extends Component {
  render() {
    return (
      <div className="max-w-4xl mx-auto bg-white border-2">
        <div className="flex ">
          <div className="h-full text-left px-4 py-4 w-full justify-end border-indigo-50">
            <a to="jobdet" className="flex items-center flex-wrap">
              <img
                alt=""
                className="inline-block object-cover object-center w-16 h-16 mb-4 bg-indigo-100 rounded"
                src={this.props.img}
              />{" "}
              <span className="flex flex-col flex-grow pl-4">
                <span className="font-bold text-xl text-indigo-500 hover:text-indigo-600 -mt-4">
                  {this.getTitle()}
                </span>
                <span className="text-sm text-indigo-300 ">
                  {this.getCompany()}
                </span>
                <span className="text-sm text-indigo-300">
                  {this.getLocation()}
                </span>
              </span>
            </a>
            <div className="flex items-center flex-wrap ">
              <a
                to="jobdet"
                className="text-indigo-500 inline-flex items-center mb-0 px-2 py-1 border-2 border-indigo-500 rounded-full text-sm"
              >
                {this.getType()}
              </a>
              <span className="text-indigo-800 mr-3 inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 px-2 bg-yellow-500 rounded-full">
                New
              </span>
              <span className="text-indigo-400 inline-flex items-center leading-none text-sm">
                6 days
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getTitle() {
    return this.props.title === undefined ? "UNKNOWN" : this.props.title;
  }

  getCompany() {
    return this.props.company === undefined ? "UNKNOWN" : this.props.company;
  }

  getLocation() {
    return this.props.Location === undefined ? "UNKNOWN" : this.props.Location;
  }

  getType() {
    return this.props.Type === undefined ? "UNKNOWN" : this.props.Type;
  }
}

export default JobPost;
