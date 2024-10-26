import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }

      const data = await response.json();
      console.log('User logged in:', data);

      // Save user data to local storage
      localStorage.setItem('user', JSON.stringify(data));

      // Redirect to another page after login (e.g., dashboard)
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-3xl transform transition-all hover:scale-105">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Welcome Back</h2>
        <p className="text-center text-sm text-gray-600">Login to your account</p>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-8 space-y-6">
            <div className="space-y-4">
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
            </div>


            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-6 border border-transparent text-lg font-semibold rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log In
              </button>
            </div>

            <p className="text-center text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
