import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../AuthContext'; 
import { Link, useNavigate } from 'react-router-dom'; 
import 'primeicons/primeicons.css';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  const handleSubmit = (values, { setFieldError }) => {

    const users = JSON.parse(localStorage.getItem('users')) || [];


    const emailExists = users.some(user => user.email === values.email);

    if (emailExists) {
      setFieldError('email', 'This email is already registered');
      return;
    }
    users.push(values);

    // Save updated list of users to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(values)); 
    localStorage.setItem('isAuth', JSON.stringify(true));

    // Trigger login and navigate to home page
    login(values);
    navigate('/home');

    alert('Registration Successful');
  };

  return (
    <div className="register-form flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-96 p-10 rounded-lg border border-primary mt-20">
            {/* Name Field */}
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <i className="pi pi-user"></i>
              </span>
              <Field
                type="text"
                id="name"
                name="name"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                placeholder="Name"
              />
            </div>
            <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />

            {/* Email Field */}
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">
              Email
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                <i className="pi pi-at"></i>
              </span>
              <Field
                type="email"
                id="email"
                name="email"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                placeholder="Email"
              />
            </div>
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />

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
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />

            {/* Submit Button */}
            <div className="grid w-full justify items-center mt-2">
              <button
                type="submit"
                className="text-white bg-primary hover:bg-black rounded-lg px-8 py-2 mt-4 text-center"
                disabled={isSubmitting}
              >
                Register new account
              </button>
            </div>

            {/* Login Link */}
            <div className="login flex justify-center mt-2">
              <Link to="/login" >
              <span className="text-black items-center font-semibold cursor-pointer">Login</span>
              </Link>    
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
