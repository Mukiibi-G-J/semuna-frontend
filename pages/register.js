import { LockClosedIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Register = () => {
  const router = useRouter();
  const registeruser = async (e) => {
    // http://localhost:8001/api/register
    e.preventDefault();
    const response = fetch(`https://semuna-api.herokuapp.com/api/register`, {
      method: 'POST',
      headers: {
        // here we are telling the backend it json data
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: e.target.first_name.value,
        second_name: e.target.second_name.value,
        user_name: e.target.user_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const res = await response;
    if (res.status === 200) {
      router.push('/login');
    } else {
      alert(res.status);
    }
    console.log(res);
    // if res.statusCode === 200 && res.
  };
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <div>
          <div className="">
            <Link href="/">
              <a>
                <img
                  className="mx-auto h-12 w-auto rounded-full"
                  src="images/semuna1.png"
                  alt="Workflow"
                />
              </a>
            </Link>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/register">
              <a className="font-medium text-md text-indigo-600 hover:text-indigo-500">
                create an account
              </a>
            </Link>
          </p> */}
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          onSubmit={registeruser}
          method="POST"
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="First Name" className="sr-only">
                First Name
              </label>
              <input
                id="First Name"
                name="first_name"
                type="First Name"
                autoComplete="First Name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="Second Name" className="sr-only">
                Second Name
              </label>
              <input
                id="Second Name"
                name="second_name"
                type="Second Name"
                autoComplete="Second Name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Second Name"
              />
            </div>
            <div>
              <label htmlFor="UserName" className="sr-only">
                UserName
              </label>
              <input
                id="UserName"
                name="user_name"
                type="UserName"
                autoComplete="UserName"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="UserName"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* <div>
              <label htmlFor="Phone Number" className="sr-only">
                Phone Number
              </label>
              <input
                id="Phone Number"
                s
                name="Phone Number"
                type="Phone Number"
                autoComplete="Phone Number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone Number"
              />
            </div> */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="Confirm password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="Confirm password"
                name="Confirm password"
                type="Confirm password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Register
            </button>
            <p className="mt-2 text-center text-xl text-gray-600">
              Or
              <Link href="/login">
                <a className="font-medium text-xl text-indigo-600 hover:text-indigo-500">
                  Already have an account sign in
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
