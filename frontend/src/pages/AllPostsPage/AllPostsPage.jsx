import React, { Component } from "react";
import UserPost from "../../components/UserPost.jsx";

export default class AllPostsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
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
    fetch("http://localhost:5000/api/v1/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ posts: result.posts });
      });
  }

  deletePost = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const api = `http://localhost:5000/api/v1/posts/${id}`;
    fetch(api, requestOptions)
      .then(response => {
        if (response.status === 200) {
          this.getPosts();
        }
      });
  }

  renderPosts() {
    return this.state.posts.map((post) => (
      <UserPost
        post={post} key={post.id}
        onDeletePost={() => this.deletePost(post.id)}
      />
    ));
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}
