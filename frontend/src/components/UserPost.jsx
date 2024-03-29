import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class UserPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      comments: [],
      comment: "",
      liked: false,

      posterAvatar: "",
      userAvatar: "",
      likerAvatars: [],
      commentAvatars: {},
      tags: [],
    };
  }

  componentDidMount() {
    this.getLikes();
    this.getComments();
    this.getPosterAvatar();
    this.getTags();

    const userId = localStorage.getItem("userId");
    this.getUserInfo(userId)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ userAvatar: result.avatar });
      });
  }

  getPosterAvatar() {
    this.getUserInfo(this.props.post.user_id)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ posterAvatar: result.avatar });
      });
  }

  getTags() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ tags: result.tags });
      });
  }

  getLikes() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/likes`;
    let likerAvatars = [];
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Get liker avatars
        if (result.likes.length === 0) {
          this.setState({ likerAvatars });
        } else {
          result.likes.forEach((like) => {
            this.getUserInfo(like.user_id)
              .then((response) => response.json())
              .then((result) => {
                likerAvatars.push(result.avatar);
                this.setState({ likerAvatars });
              });
          });
        }
        // Set likes
        if (this.isUserLiked(result.likes)) {
          this.setState({ likes: result.likes, liked: true });
        } else {
          this.setState({ likes: result.likes, liked: false });
        }
      });
  }

  likePost() {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
      }),
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/likes`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getLikes();
      }
    });
  }

  unLikePost(likeId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/likes/${likeId}`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getLikes();
      }
    });
  }

  getComments() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/comments`;
    let commentAvatars = {};
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // Get liker avatars
        if (result.comments.length === 0) {
          this.setState({ commentAvatars });
        } else {
          result.comments.forEach((comment) => {
            this.getUserInfo(comment.user_id)
              .then((response) => response.json())
              .then((result) => {
                commentAvatars[result.id] = result.avatar;

                this.setState({ commentAvatars });
              });
          });
        }
        this.setState({ comments: result.comments });
      });
  }

  postComment(comment) {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: comment,
        user_id: userId,
      }),
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/comments`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getComments();
      }
    });
  }

  deleteComment(commentId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.props.post.id;
    const api = `http://localhost:5000/api/v1/posts/${id}/comments/${commentId}`;
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

  getContent() {
    return this.props.post.content || "No content";
  }

  getTitle() {
    return this.props.post.title || "No title";
  }

  onKeyDown = (e) => {
    if (e.key === "Enter") {
      if (this.state.comment) {
        this.postComment(this.state.comment);
        this.setState({ comment: "" });
      }
    }
  };

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

  onCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  onCommentDelete = (commentId) => {
    this.deleteComment(commentId);
  };

  renderComments() {
    const userId = localStorage.getItem("userId");
    if (this.state.comments.length === 0) {
      return;
    }
    return this.state.comments.map((comment) => {
      return (
        <div
          key={comment.id}
          className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
        >
          <Link
            to={`/personal_profile/${comment.user_id}`}
            className=""
            key={comment.user_id}
          >
            <img
              className="w-6 h-6 object-cover rounded-full shadow mr-2 cursor-pointer"
              alt="User avatar"
              src={this.state.commentAvatars[comment.user_id]}
            />
          </Link>

          <span className="absolute inset-y-0 right-0 flex items-center pr-6"></span>
          <div className="flex flex-row justify-between w-full text-sm">
            <div>{comment.content}</div>
            <div className="text-gray-600 font-light text-xs mx-5">
              {comment.user_id === userId && (
                <button
                  onClick={() => this.onCommentDelete(comment.id)}
                  className="bg-white transition ease-out duration-300 hover:text-red-500 w-6 h-6 px-1 border text-center rounded-full text-gray-400 cursor-pointer mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    });
  }

  isUserLiked = (likes) => {
    const userId = localStorage.getItem("userId");
    for (let i = 0; i < likes.length; i++) {
      if (userId === likes[i].user_id) {
        return likes[i].id;
      }
    }
  };

  onLikeClick = () => {
    const likeId = this.isUserLiked(this.state.likes);
    if (likeId) {
      this.unLikePost(likeId);
    } else {
      this.likePost();
    }
  };

  renderLikers = () => {
    return this.state.likerAvatars
      .map((a) => (
        <img
          key={a}
          className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
          src={a}
          alt=""
        />
      ))
      .slice(0, 4);
  };

  renderPostImage = () => {
    if (this.props.post.image) {
      return (
        <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
          <img
            className="rounded"
            src={this.props.post.image}
            alt="User post image"
          />
        </div>
      );
    }
  };

  renderTags = () => {
    if (this.props.post.tags) {
      return this.props.post.tags.map((tag) => (
        <div
          key={tag}
          className="mx-3 w-min transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-indigo-500 hover:text-gray-800"
        >
          <div>#{tag}</div>
        </div>
      ));
    }
  };

  render() {
    const userId = localStorage.getItem("userId");
    return (
      // <!-- This is an example component -->
      <div className="w-full">
        <div className="flex flex-wrap max-w-xl mt-3 mb-10 bg-white border rounded-lg overflow-hidden mx-auto">
          {/* post */}
          <div className="flex items-center w-full">
            <div className="w-full">
              <div className="flex flex-row mt-2 px-2 py-3 mx-3 justify-between">
                <div className="flex flex-row">
                  <div className="w-auto h-auto border-2 border-white-500">
                    <Link
                      to={`/personal_profile/${this.props.post.user_id}`}
                      className=""
                      key={this.props.post.user_id}
                    >
                      <img
                        className="w-12 h-12 object-cover shadow cursor-pointer"
                        alt="User avatar"
                        src={this.state.posterAvatar}
                      />
                    </Link>
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
                <div>
                  {this.props.post.user_id === userId && (
                    <button
                      onClick={this.props.onDeletePost}
                      className="focus:outline-none bg-white transition ease-out duration-300 hover:text-red-500 w-9 h-9 px-2 border text-center rounded-full text-gray-400 cursor-pointer mr-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-gray-500 font-normal text-sm mb-6 mx-3 px-2">
                {this.getContent()}
              </div>
              {this.renderPostImage()}
              <div className="flex flex-row">{this.renderTags()}</div>
              <div className="flex justify-start mb-4">
                <div className="flex w-full mt-1 pt-2 pl-5">
                  <button
                    onClick={this.onLikeClick}
                    className={
                      this.state.liked
                        ? "focus:outline-none bg-white transition ease-out duration-300 border w-8 h-8 px-2 text-center rounded-full text-red-500 cursor-pointer mr-2"
                        : "focus:outline-none bg-white transition ease-out duration-300 border w-8 h-8 px-2 text-center rounded-full text-gray-400 hover:text-red-500 cursor-pointer mr-2"
                    }
                  >
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
                  <div className="flex ">{this.renderLikers()}</div>
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
                  src={this.state.userAvatar}
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-6"></span>
                <input
                  onChange={this.onCommentChange}
                  value={this.state.comment}
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
