import React, { Component } from "react";
import Crayon from "./Crayon.jpg";

class JobPosting extends Component {
  render() {
    return (
      <div>
        <div className="flex border ml-5 mr-5 p-3">
          <img src={Crayon} width="30" height="30" />
          <text className="text text-primary ml-3">It is a company name.</text>
          {/* <span className = "ml-3">It is a time.</span> */}
          <div>
            <p className="mt-2">
              It is a paragraph, a very very very very very very very
              looooooooooooong paragraph.
            </p>
          </div>
          <img
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
            src={Crayon}
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
