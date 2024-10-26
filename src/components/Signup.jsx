import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const [avatar, setAvatar] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = async (values) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: avatar || 'https://picsum.photos/800', // Default if no avatar is selected
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error signing up');
      }

      const data = await response.json();
      console.log('User signed up:', data);
      // Handle success (e.g., navigate to login page)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-3xl transform transition-all hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Create Account</h2>
        <p className="text-center text-sm text-gray-600">Sign up to get started!</p>

        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-4">Avatar:</label>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleImageUpload(e);
                      setFieldValue('avatar', e.currentTarget.files[0]);
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {avatar && <img src={avatar} alt="Avatar Preview" className="w-24 h-24 rounded-full mx-auto mt-4" />}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
