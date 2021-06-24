import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const signUpDisabled = () => {
    const fieldFilled = email === "" || password === "" || firstName === "" || lastName === "";
    return fieldFilled || !validateEmail(email);
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }

  const onSignUpFormSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
    }
    fetch("http://localhost:5000/api/v1/users", requestOptions)
      .then(response => response.json())
      .then(result => {
        setSignupSuccess(true);
      });
  }

  if (signupSuccess) {
    return <Redirect to="/" />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="container bg-white mx-auto rounded-md shadow-md md:shadow-xl md:h-4/5 my-auto mt-28 p-5 max-w-3xl">
        <div className="text-center md:mt-10">
          <div className="text-3xl font-semibold">Create your account</div>
          <div className="mt-3 text-gray-400 font-medium">Join EntreE Now</div>
        </div>
        <form className="p-8 md:pl-36 md:pr-36" onSubmit={onSignUpFormSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full md:w-1/2 md:pr-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                id="firstName"
                type="text"
                placeholder="Jane"
                onChange={e => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                id="lastName"
                type="text"
                placeholder="Doe"
                onChange={e => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 ${emailError? 'border-red-500' : ''}`}
              id="email"
              type="text"
              placeholder="example@email.com"
              onChange={onEmailChange}
              value={email}
            />
            <p className="text-red-500 text-sm italic">{emailError}</p>
          </div>
          <div className="mb-6 md:mb-12">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              type="password"
              placeholder="***********"
              onChange={e => setPassowrd(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="customize-signup-form-create-btn bg-indigo-500 hover:bg-indigo-600 text-md text-white font-bold py-3 px-8 rounded focus:outline-none focus:ring focus:border-indigo-300"
              type="submit"
              disabled={signUpDisabled()}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}