import React, { Component } from "react";
import UserPost from "../../components/UserPost.jsx";
import PostBoxComponent from "../../components/PostBoxComponent.jsx";
import { Link } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader.jsx";
import SearchResultPage from "../SearchResultPage/SearchResultPage";
import JobPost from "../../components/JobPostComponent.jsx";
import CourseProgressReport from "../../components/CourseProgressReport.jsx";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      job_posts: [],
      searchResult: [],
      hasSearched: false,
      currentTab: "Home",
      
      viewMyPosts: false,
    };
  }

  componentDidMount() {
    this.getPosts();
    this.getJobPosts();
  }

  getPosts() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/api/v1/posts?limit=3", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ posts: result.posts });
      });
  }

  getMyPosts() {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/posts?posted_by=${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ posts: result.posts });
      });
  }

  getJobPosts() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/api/v1/job_posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ job_posts: result.job_posts });
      });
  }

  onSearch = (searchResult) => {
    this.setState({
      hasSearched: true,
      searchResult: searchResult,
      currentTab: "",
    });
  };

  createPost = (content, title, tags) => {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags,
        user_id: userId,
      }),
    };
    const api = `http://localhost:5000/api/v1/posts`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getPosts();
      }
    });
  };

  deletePost = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const api = `http://localhost:5000/api/v1/posts/${id}`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getPosts();
      }
    });
  };

  onActionClick = (action) => {
    if (action === "My Posts") {
      if (this.state.viewMyPosts) {
        this.getPosts();
      } else {
        this.getMyPosts();
      }
      this.setState({ viewMyPosts: !this.state.viewMyPosts });
    }
  }

  renderPosts() {
    return this.state.posts.map((post) => (
      <UserPost
        post={post}
        key={post.id}
        onDeletePost={() => this.deletePost(post.id)}
      />
    ));
  }

  renderJobPosts() {
    return this.state.job_posts.map((post) => {
      if (post.active === true) {
        return <JobPost key={post.id} jobPost={post} />;
      }
    });
  }

  renderLeftSideActions() {
    const inactiveClass = "cursor-pointer mb-1 m-2 p-2 border-transparent transition ease-out duration-300 hover:border-indigo-500 border-l-4 text-black";
    const activeClass = "cursor-pointer mb-1 m-2 p-2 border-indigo-500 transition border-l-4 text-black bg-gray-200";
    return ["My Posts"].map((action) => (
      <div key={action} className={this.state.viewMyPosts? activeClass : inactiveClass} onClick={() => this.onActionClick(action)}>
        {action}
      </div>
    ));
  }

  render() {
    return (
      <div>
        <AuthPageHeader
          updateResult={this.onSearch}
          currentTab={this.state.currentTab}
        />
        {this.state.hasSearched ? (
          <SearchResultPage posts={this.state.searchResult} />
        ) : (
          <div className="grid grid-cols-1 md-grid-cols-12 lg:grid-cols-12 justify-center pt-10 bg-gray-50 px-2">
            {/* Profile left section */}
            <div className="col-span-3">
              <div className="bg-white p-3 border-t-4 border-indigo-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-6/12 mx-auto"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                    alt=""
                  />
                </div>
                <div className="flex flex-col mt-3 rounded-md border bg-gray-100 text-md font-medium">
                  {this.renderLeftSideActions()}
                </div>
              </div>
            </div>
            {/* Posts center section */}
            <div className="col-span-6">
              <div>
                <PostBoxComponent onCreatePost={this.createPost} />
              </div>
              <div>{this.renderPosts()}</div>
              <div className="grid justify-items-center mb-7">
                <Link
                  to="/posts"
                  className="text-indigo-500 background-transparent font-bold px-3 py-1 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  See More Posts
                </Link>
              </div>
            </div>
            {/* Others right section */}
            <div className="col-span-3 font-bold text-md">
              <div>Recent job posts</div>
              {this.renderJobPosts()}
              <br></br>
              <div>Course Learning Progress Report</div>
              <CourseProgressReport />
            </div>
          </div>
        )}
      </div>
    );
  }
}
