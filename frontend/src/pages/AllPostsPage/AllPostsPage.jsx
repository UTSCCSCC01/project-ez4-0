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

  renderPosts() {
    return this.state.posts.map((post) => (
      <UserPost post={post} key={post.id}/>
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
