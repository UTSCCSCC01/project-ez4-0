import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import "./LoginPage.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const signUpDisabled = () => {
    const fieldFilled = email === "" || password === "";
    return fieldFilled || !validateEmail(email);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const onSignInFormSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch("http://localhost:5000/api/v1/auth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.hasOwnProperty("success")) {
          setLoginSuccess(true);
        } else {
          setLoginAttempted(true);
          setLoginSuccess(false);
        }
      });
  };

  if (loginSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="container bg-white mx-auto rounded-md shadow-md md:shadow-xl md:h-4/5 my-auto md:mt-28 p-5 max-w-3xl">
        <div className="text-center md:mt-10">
          <div className="text-3xl font-semibold">Login to Entree</div>
          <div className="mt-3 text-gray-400 font-medium">
            Login in now to enjoy EntreE
          </div>
        </div>
        <form className="p-8 md:pl-36 md:pr-36" onSubmit={onSignInFormSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 ${
                emailError ? "border-red-500" : ""
              }`}
              id="email"
              type="text"
              placeholder="example@email.com"
              onChange={onEmailChange}
              value={email}
            />
            <p className="text-red-500 text-sm italic">{emailError}</p>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              type="password"
              placeholder="***********"
              onChange={(e) => setPassowrd(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>
            <div className="text-sm mb-2">
              <Link
                to="/reset"
                className="font-medium text-indigo-500 hover:text-indigo-600"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="customize-signin-form-signin-btn bg-indigo-500 hover:bg-indigo-600 text-md text-white font-bold py-3 px-8 rounded focus:outline-none focus:ring focus:border-indigo-300"
              type="submit"
              disabled={signUpDisabled()}
            >
              Login
            </button>
          </div>
        </form>
        {loginAttempted && !loginSuccess && (
          <div
            className="md:ml-36 md:mr-36 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline v">
              Incorrect email or password, please try again
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
