import { LockClosedIcon } from '@heroicons/react/outline';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Store } from '../context/store';
import jwt_decode from 'jwt-decode';

const Login = () => {
  const { state, dispatch } = useContext(Store);
  const { user } = state;

  const router = useRouter();
  const { redirect } = router.query;
  console.log(redirect);
  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, []);
  let loginUser = async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const response = fetch(`http://127.0.0.1:8001/api/token/`, {
      method: 'POST',
      headers: {
        // here we are telling the backend it json data
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const res = await response;
    const data = await res.json();
    console.log('response:', data);
    console.log('refresh:', data.refresh);
    console.log('access:', data.access);
    const name = jwt_decode(data.access);
    // const n = JSON.parse(name);
    console.log(name);

    if (data) {
      localStorage.setItem('authtokens', JSON.stringify(data));
      Cookies.set('access', JSON.stringify(data.access));
      Cookies.set('refresh', JSON.stringify(data.refresh));
      Cookies.set('user', JSON.stringify(name));
      dispatch({ type: 'AUTH_TOKENS', payload: data });
      dispatch({ type: 'USER_LOGIN', payload: name });

      // setAuthTokens(data);
      // setUser(jwt_decode(data.acscess));
      // console.log(jwt_decode(data.acscess));
      if (data.access) {
        // Cookies.set('user',;
        router.push(redirect || '/');
      }
    }

    // console.log(data);
    // // } else {
    //   alert("something went wrong");
    // }
  };
  // console.log(user?.username);
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 ">
        <div>
          <div className="">
            <Link href="/">
              <img
                className="mx-auto h-12 w-auto rounded-full"
                src="images/semuna1.png"
                alt="Workflow"
              />
            </Link>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/register">
              <a className="font-medium text-md text-indigo-600 hover:text-indigo-500">
                create an account
              </a>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={loginUser} method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
