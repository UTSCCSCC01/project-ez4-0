import AuthPageHeader from "../../components/AuthPageHeader";
import React from "react";
import UserPost from "../../components/UserPost";
import qs from "qs";

export default class SearchResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      querys: qs.parse(props.location.search, { ignoreQueryPrefix: true }),
      results: [],
    };
  }

  componentDidMount() {
    if (this.state.querys.tags) {
      this.searchByTags(this.state.querys.tags);
    } else if (this.state.querys.keyword) {
      this.searchByKeyword(this.state.querys.keyword);
    }
  }

  searchByKeyword(keyword) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:5000/api/v1/posts?keyword=${keyword}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ results: result.posts });
      });
  }

  searchByTags(tags) {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:5000/api/v1/posts?tags=${tags}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ results: result.posts });
      });
  }

  render() {
    return (
      <div>
        <AuthPageHeader currentTab="Home" />
        <div className="flex flex-col items-center">
          {this.state.results.length > 0 ? (
            <div className="flex flex-col space-y-8 pt-6 pb-24 items-center">
              {this.state.results.map((post) => (
                <UserPost post={post} key={post.id} />
              ))}
            </div>
          ) : (
            <div className="mt-3">No matching posts found</div>
          )}
        </div>
      </div>
    );
  }
}
