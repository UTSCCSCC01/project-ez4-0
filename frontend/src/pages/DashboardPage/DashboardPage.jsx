import React, { Component } from "react";
import UserPost from "../../components/UserPost.jsx";
import PostBoxComponent from "../../components/PostBoxComponent.jsx";
import { Link } from "react-router-dom";
import AuthPageHeader from "../../components/AuthPageHeader.jsx";
import SearchResultPage from "../SearchResultPage/SearchResultPage";

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchResult: [],
      hasSearched: false,
      currentTab: "Home",
    };
  }

  componentDidMount() {
    this.getPosts();
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
          <div className="grid justify-center pt-10 bg-gray-50">
            <div className="w-screen px-5 md:w-post-width mb-7">
              <PostBoxComponent onCreatePost={this.createPost} />
            </div>
            <div className="w-screen px-5 md:w-post-width">
              {this.renderPosts()}
            </div>
            <Link
              to="/posts"
              className="text-indigo-500 background-transparent font-bold px-3 pb-10 text-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              See More
            </Link>
          </div>
        )}
      </div>
    );
  }
}
