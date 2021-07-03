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
                    className="h-auto w-full mx-auto"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  Jane Doe
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  Owner at Her Company Inc.
                </h3>
                <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, eligendi dolorum sequi illum qui unde
                  aspernatur non deserunt
                </p>
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
