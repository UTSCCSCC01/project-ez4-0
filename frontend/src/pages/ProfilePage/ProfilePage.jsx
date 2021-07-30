import React from "react";
import "./Profile.css";
import { Component } from "react";
import AuthPageHeader from "../../components/AuthPageHeader";
import UserPost from "../../components/UserPost";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: this.props.match.params.id,
      birthdate: [],
      email: [],
      first_name: [],
      last_name: [],
      phone: [],
      gender: [],
      editProfile: false,
      avatar: "",
      bio: "",
      myPosts: [],
    };
  }

  onFnameChange = (e) => {
    this.setState({ first_name: e.target.value });
  };

  onLnameChange = (e) => {
    this.setState({ last_name: e.target.value });
  };

  onGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };

  onPhoneChange = (e) => {
    this.setState({ phone: e.target.value });
  }

  onEmailChange = (e) => {
    this.setState({ email: e.target.value });
  }

  onBirthdateChange = (e) => {
    this.setState({ birthdate: e.target.value });
  }

  onProfileSubmit = (e) => {
    e.preventDefault();
    this.setState({ editProfile: false });
    this.updateProfile();
  };

  updateProfile = () => {
    const id = this.state.profileId;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthdate: this.state.birthdate,
        first_name: this.state.first_name,
        gender: this.state.gender,
        last_name: this.state.last_name,
        phone_number: this.state.phone,
      }),
    };
    const api = `http://localhost:5000/api/v1/users/${id}`;
    fetch(api, requestOptions).then((response) => {
    });
  };

  onEditProfileClick = () => {
    this.setState({ editProfile: true });
  };

  componentDidMount() {
    this.getInfo();
    this.getPosts();
  }

  getInfo() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const id = this.state.profileId;
    const api = `http://localhost:5000/api/v1/users/${id}`;
    fetch(api, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ birthdate: result.birthdate });
        this.setState({ email: result.email });
        this.setState({ first_name: result.first_name });
        this.setState({ last_name: result.last_name });
        this.setState({ phone: result.phone_number });
        this.setState({ gender: result.gender });
        this.setState({ bio: result.bio });
        this.setState({ avatar: result.avatar });
      });
  }

  renderAbout = () => {
    const userId = localStorage.getItem("userId");
    return (
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <span className="text-indigo-600">
            <svg
              className="h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
          <span className="tracking-wide">About</span>

          <div>
            {this.state.profileId === userId && (
              <button
                onClick={this.onEditProfileClick}
                className="focus:outline-none bg-white transition ease-out duration-300 hover:text-red-500 w-9 h-9 px-2 border-none text-center rounded-full text-gray-400 cursor-pointer mr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 25 25"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div>{this.renderInfo()}</div>
      </div>
    );
  };

  renderInfo = () => {
    if (!this.state.editProfile) {
      return (
        <div className="text-gray-700">
          <div className="grid md:grid-cols-2 text-sm">
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">First Name</div>
              <div className="px-4 py-2">{this.state.first_name}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Last Name</div>
              <div className="px-4 py-2">{this.state.last_name}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Gender</div>
              <div className="px-4 py-2">{this.state.gender}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Contact No.</div>
              <div className="px-4 py-2">{this.state.phone}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Email.</div>
              <div className="px-4 py-2">
                <a className="text-blue-800" href="mailto:jane@example.com">
                  {this.state.email}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Birthday</div>
              <div className="px-4 py-2">{this.state.birthdate}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-gray-700">
          <form onSubmit={this.onProfileSubmit}>
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">First Name</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    placeholder="FirstName"
                    onChange={this.onFnameChange}
                    value={this.state.first_name}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    placeholder="LastName"
                    onChange={this.onLnameChange}
                    value={this.state.last_name}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    placeholder="Female"
                    onChange={this.onGenderChange}
                    value={this.state.gender}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Phone Number</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    placeholder="6470000000"
                    onChange={this.onPhoneChange}
                    value={this.state.phone}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href="mailto:jane@example.com">
                    {this.state.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Birthday</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    placeholder="1999-01-01"
                    onChange={this.onBirthdateChange}
                    value={this.state.birthdate}
                  />
                </div>
              </div>

              <div className="w-1/2 grid justify-items-start">
                <button
                  type="submit"
                  className="customize-post-box-post-btn group relative w-1/3 flex justify-center py-2 px-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  };

  getPosts() {
    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:5000/api/v1/posts?posted_by=${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({ myPosts: result.posts });
      });
  }

  deletePost(postId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const api = `http://localhost:5000/api/v1/posts/${postId}`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        this.getPosts();
      }
    });
  }

  renderMyPosts() {
    return this.state.myPosts.map((post) => (
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
        <AuthPageHeader />
        <div>
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* <!-- Left Side --> */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-gray-100 p-3 border-t-4 border-indigo-400">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src={this.state.avatar}
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {this.state.first_name} {this.state.last_name}
                  </h1>
                  <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                    {this.state.bio}
                  </p>
                </div>
                {/* <!-- End of friends card --> */}
              </div>
              {/* <!-- Right Side --> */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                {/* <!-- Profile tab -->
                        <!-- About Section --> */}

                {this.renderAbout()}
                {/* <!-- End of about section --> */}

                <div className="my-4"></div>

                {/* <!-- Experience and education --> */}
                <div className="bg-gray-100 p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-1">
                    <div>{this.renderMyPosts()}</div>
                  </div>
                  {/* <!-- End of Experience and education grid --> */}
                </div>
                {/* <!-- End of profile tab --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
