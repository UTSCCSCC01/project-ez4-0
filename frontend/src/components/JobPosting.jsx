import React, { Component } from "react";

class JobPosting extends Component {
  render() {
    return (
      <div>
        <div className="flex border ml-5 mr-5 p-3">
          <img src={this.props.img} width="30" height="30" />
          <text className="text text-primary ml-2">{this.props.name}</text>
          {/* <span className = "ml-3">It is a time.</span> */}
          <div>
            <p className="mt-2">{this.props.context1}</p>
          </div>
          <img
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            src={this.props.context2}
            className=""
          />

          <hr />
          <div>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              ❤ Like
            </button>
          </div>
        </div>

        <div className="card">123</div>
      </div>
    );
  }
}

export default JobPosting;
