import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../AuthContext';  
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import 'primeicons/primeicons.css';

const Login = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate(); 

  // Validation Schema for Formik
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  // Form Submit Handler
  const handleSubmit = (values, { setSubmitting, setFieldError }) => {
    // Get the list of users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log("localdata", storedUsers);

    // Find the user with the matching email
    const storedUser = storedUsers.find(user => user.email === values.email);
    console.log("Found User:", storedUser);

    // Check if the user was found and the password matches
    if (storedUser && storedUser.password === values.password) {
      login(storedUser); 
      localStorage.setItem('isAuth', JSON.stringify(true)); 
      navigate('/home'); 
    } else {
      setFieldError('general', 'Invalid email or password'); // Show general error
    }

    setSubmitting(false); 
  };

  return (
    <div className="register-form flex justify-center items-center">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className="w-96 p-10 rounded-lg border border-primary mt-20">
            {/* Email Field */}
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <i className="pi pi-at"></i>
              </span>
              <Field
                type="text"
                id="email"
                name="email"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                placeholder="Email"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />

            {/* Password Field */}
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
              Password
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <i className="pi pi-lock"></i>
              </span>
              <Field
                type="password"
                id="password"
                name="password"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                placeholder="Password"
              />
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

            {/* General Error Display */}
            {errors.general && (
              <div className="text-red-500 text-sm mt-1">{errors.general}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>

            {/* Link to Registration Page */}
            <div className="mt-4 text-sm text-center">
              <Link to="/" className="text-black hover:underline">
                Register here
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
