import React, { useState } from 'react';

export default function ResetPasswordConfirmPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const resetDisabled = () => {
    const fieldFilled = password === "" || confirmPassword === "";
    return !validateConfirmPassword(password, confirmPassword) || fieldFilled;
  }

  const validateConfirmPassword = (password, confirmPassword) => {
    return confirmPassword === password;
  }

  const onPassowrdChange = (e) => {
    setPassword(e.target.value);
    if (!validateConfirmPassword(e.target.value, confirmPassword)) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (!validateConfirmPassword(password, e.target.value)) {
      setConfirmPasswordError("Password does not match");
    } else {
      setConfirmPasswordError("");
    }
  }

  const onResetFormSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="container bg-white mx-auto rounded-md shadow-md md:shadow-xl md:h-4/5 my-auto p-5 max-w-3xl">
        <div className="text-center md:mt-10">
          <div className="text-3xl font-semibold">Reset Password</div>
          <div className="mt-3 text-gray-400 font-medium">Enter your new password</div>
        </div>
        <form className="p-8 md:pl-36 md:pr-36" onSubmit={onResetFormSubmit}>
          <div className="mb-8">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
              id="password"
              type="password"
              placeholder="***********"
              onChange={onPassowrdChange}
              value={password}
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="password-confirm">
              Confirm Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 ${confirmPasswordError? 'border-red-500' : ''}`}
              id="password-confirm"
              type="password"
              placeholder="***********"
              onChange={onConfirmPasswordChange}
              value={confirmPassword}
            />
            <p className="text-red-500 text-sm italic">{confirmPasswordError}</p>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="customize-login-form-create-btn bg-blue-500 hover:bg-blue-600 text-md text-white font-bold py-3 px-8 rounded focus:outline-none focus:ring focus:border-blue-300"
              type="submit"
              disabled={resetDisabled()}
            >
              Confirm Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}