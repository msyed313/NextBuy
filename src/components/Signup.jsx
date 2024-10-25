import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-3xl transform transition-all hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Create Account</h2>
        <p className="text-center text-sm text-gray-600">Sign up to get started!</p>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
