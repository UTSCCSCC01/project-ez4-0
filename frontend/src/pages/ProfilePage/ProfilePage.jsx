import React from "react";
import "./Profile.css";
import { Component } from "react";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileId: this.props.match.params.id,
      address: [],
      birthdate: [],
      email: [],
      first_name: [],
      last_name: [],
      phone: [],
      gender: [],
      editProfile: false,
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

  onProfileSubmit = (e) => {
    e.preventDefault();
    this.setState({ editProfile: false });
    this.updateProfile();
  };

  updateProfile = (first_name, last_name, gender) => {
    const id = this.state.profileId;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        address: "",
        birthdate: "2001-08-17",
        email: "",
        first_name: first_name,
        gender: gender,
        last_name: last_name,
        phone_number: "",
      }),
    };
    const api = `http://localhost:5000/api/v1/users/${id}`;
    fetch(api, requestOptions).then((response) => {
      if (response.status === 200) {
        console.log("Updated");
      }
    });
  };

  onEditProfileClick = () => {
    this.setState({ editProfile: true });
  };

  componentDidMount() {
    this.getInfo();
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
        this.setState({ address: result.address });
        this.setState({ birthdate: result.birthdate });
        this.setState({ email: result.email });
        this.setState({ first_name: result.first_name });
        this.setState({ last_name: result.last_name });
        this.setState({ phone: result.phone_number });
        this.setState({ gender: result.gender });
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
              <div className="px-4 py-2 font-semibold">Current Address</div>
              <div className="px-4 py-2">{this.state.address}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-2 font-semibold">Permanant Address</div>
              <div className="px-4 py-2">{this.state.address}</div>
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
                    id="first_name"
                    name="first_name"
                    placeholder="first_name"
                    onChange={this.onFnameChange}
                    value={this.state.first_name}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Last Name</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    id="last_name"
                    name="last_name"
                    placeholder="last_name"
                    onChange={this.onLnameChange}
                    value={this.state.last_name}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Gender</div>
                <div className="px-4 py-2">
                  <input
                    className="w-full px-5 py-2 text-gray-700 bg-gray-100 rounded"
                    id="gender"
                    name="gender"
                    placeholder="gender"
                    onChange={this.onGenderChange}
                    value={this.state.gender}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2">{this.state.phone}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Current Address</div>
                <div className="px-4 py-2">{this.state.address}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                <div className="px-4 py-2">{this.state.address}</div>
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

  render() {
    const userId = localStorage.getItem("userId");
    return (
      <div>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />

        <div className="bg-gray-100 pt-20">
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* <!-- Left Side --> */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-t-4 border-indigo-400">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {this.state.first_name} {this.state.last_name}
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
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
                {/* <!-- Friends card --> */}
                <div className="bg-white p-3 hover:shadow">
                  <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                    <span className="text-indigo-600">
                      <svg
                        className="h-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </span>
                    <span>Friends Profiles</span>
                  </div>
                  <div className="grid grid-cols-3">
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Kojstantin
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        James
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Natie
                      </a>
                    </div>
                    <div className="text-center my-2">
                      <img
                        className="h-16 w-16 rounded-full mx-auto"
                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                        alt=""
                      />
                      <a href="#" className="text-main-color">
                        Casey
                      </a>
                    </div>
                  </div>
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
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-indigo-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-indigo-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-indigo-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-indigo-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span className="text-indigo-600">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                              fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-indigo-600">
                            Masters Degree in University of Toronto
                          </div>
                          <div className="text-gray-500 text-xs">
                            September 2017 - 2021 May
                          </div>
                        </li>
                        <li>
                          <div className="text-indigo-600">
                            Bachelors Degreen in UBC
                          </div>
                          <div className="text-gray-500 text-xs">
                            May 2021 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
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
