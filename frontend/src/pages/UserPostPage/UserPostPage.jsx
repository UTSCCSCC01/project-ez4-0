  
import React, { Component } from "react";
import UserPost from "../../components/UserPost.jsx";

class AllUserPosting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_posts: [],
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/api/v1/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({ user_posts: result.posts });
      });
  }

  render() {
    return (
      <div>
        {this.state.user_posts.map((post) => {
          if (true) {
            // console.log(post);
            return <UserPost posted_at={post.posted_at} content={post.content} />;
          }
        })}
      </div>
    );
  }
}

export default AllUserPosting;