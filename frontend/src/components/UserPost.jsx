import React, { Component } from "react";
import moment from "moment";

class UserPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      comments: [],
      comment: "",
    };
  }

  componentDidMount() {
    this.getLikes();
    this.getComments();
  }

  getLikes() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/likes`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ likes: result.likes });
      });
  }

  getComments() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/comments`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ comments: result.comments });
      });
  }

  postComment(comment) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: {
        content: comment,
        user_id: "",
      },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/comments`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getComments();
      }
    });
  }

  getDate() {
    if (this.props.post.posted_at) {
      return moment(this.props.post.posted_at).format("YYYY-MM-DD hh:mm:ss");
    }
    return "Unknwon date";
  }

  getCommentDate(comment) {
    if (comment.posted_at) {
      return moment(comment.posted_at).format("YYYY-MM-DD hh:mm:ss");
    }
    return "Unknwon date";
  }

  getContent() {
    return this.props.post.content || "No content";
  }

  getTitle() {
    return this.props.post.title || "No title";
  }

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (this.state.comment) {
      }
    }
  };

  onCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  renderComments() {
    if (this.state.comments.length === 0) {
      return;
    }
    return this.state.comments.map((comment) => {
      return (
        <div
          key={comment.id}
          className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
        >
          <img
            className="w-6 h-6 object-cover rounded-full shadow mr-2 cursor-pointer"
            alt="User avatar"
            src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            alt="User avatar"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-6"></span>
          <div className="flex flex-row justify-between w-full text-sm">
            <div>{comment.content}</div>
            <div className="text-gray-600 font-light text-xs mx-5">
              {this.getCommentDate(comment)}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      // <!-- This is an example component -->
      <div className="">
        <div className="flex flex-wrap max-w-xl mt-3 mb-4 bg-white border rounded-md overflow-hidden mx-auto shadow-post">
          {/* post */}
          <div className="flex items-center w-full">
            <div className="w-full">
              <div className="flex flex-row mt-2 px-2 py-3 mx-3">
                <div className="w-auto h-auto border-2 border-white-500">
                  <img
                    className="w-12 h-12 object-cover shadow cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                  />
                </div>
                <div className="flex flex-col mb-2 ml-4 mt-1">
                  <div className="text-gray-600 text-sm font-semibold">
                    {this.props.post.title}
                  </div>
                  <div className="flex w-full mt-1">
                    <span className="text-gray-400 font-normal text-xs">
                      {this.getDate()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-gray-500 font-normal text-sm mb-6 mx-3 px-2">
                {this.getContent()}
              </div>
              <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
                <img
                  className="rounded"
                  src="https://picsum.photos/536/354"
                  alt="User post image"
                />
              </div>
              <div className="flex justify-start mb-4">
                <div className="flex w-full mt-1 pt-2 pl-5">
                  <button className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      width="14px"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z"
                      />
                    </svg>
                  </button>
                  {/* Show users who liked this post, at most four */}
                  <div className="flex ">
                    <img
                      className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                      alt=""
                    />
                    <img
                      className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full ">
                <div className="mt-3 mx-5 flex flex-row">
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Comments:
                    <div className="ml-1 text-gray-400 font-normal text-ms">
                      {this.state.comments.length}
                    </div>
                  </div>
                </div>
                <div className="mt-3 mx-5 w-full flex justify-end">
                  <div className="flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center">
                    Likes:{" "}
                    <div className="ml-1 text-gray-400 font-normal text-ms">
                      {this.state.likes.length}
                    </div>
                  </div>
                </div>
              </div>
              {/* Show comments */}
              {this.renderComments()}

              <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                <img
                  className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                  alt="User avatar"
                  src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                  alt="User avatar"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-6"></span>
                <input
                  onChange={this.onCommentChange}
                  onKeyDown={this.onKeyDown}
                  className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                  placeholder="Post a comment..."
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="matheusgongo"
          data-description="Support me on Buy me a coffee!"
          data-message="Thank you for visiting! :D"
          data-color="#BD5FFF"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
      </div>
    );
  }
}

export default UserPost;
