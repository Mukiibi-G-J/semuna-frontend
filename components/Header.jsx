import React, { useContext } from 'react';
import { ChevronDownIcon, SearchIcon, UserIcon } from '@heroicons/react/solid';
import {
  BellIcon,
  HeartIcon,
  LogoutIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';
import Jdenticon from 'react-jdenticon';
import Link from 'next/link';
import { Store } from '../context/store';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Header = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const logoutuser = () => {
    localStorage.removeItem('authtokens');
    Cookies.remove('authtokens');
    Cookies.remove('cart_Items');
    Cookies.remove('refresh');
    Cookies.remove('access');
    Cookies.remove('user');
    router.push('/login');
    dispatch({ type: 'USER_LOGOUT' });
  };

  const {
    user,
    cart: { cart_Items },
  } = state;
  // console.log(cart_Items.length);
  console.log(user?.username);
  return (
    <div className="header bg-gray-900  top-0  h-16 flex items-center   z-50 sticky">
      <div className="logo w-1/5 h-16 ml-10 ">
        <Link href="/" passHref>
          <a href="">
            <img
              src="/images/semuna.png"
              className="w-28 h-16 object-contain"
              alt="logo"
            />
          </a>
        </Link>
      </div>
      <div className="flex items-center">
        <input
          className="h-9 px-3 w-30 bg-gray-800 placeholder-white border border-gray-500 text-white border-opacity-75 rounded-l-xl ml-6 focus:outline-none"
          type="text"
          placeholder="Search...."
          id="search"
        />
        <div className="categories flex items-center h-9 w-30 bg-gray-800 border border-gray-500 text-white border-opacity-75 px-3">
          Categories
          <ChevronDownIcon className="h-6 w-6 ml-2" />
        </div>
        <div className="search-icon h-9 w-10 bg-yellow-600 rounded-r-xl flex justify-center items-center">
          <SearchIcon className="h-6 w-6 text-white" />
        </div>
      </div>
      {/* right icons */}

      <div className="icons text-white flex items-center  mr-4 w-48  ml-auto h-16 ">
        {/* <HeartIcon className="h-6 w-6 mr-1" /> */}
        {/* <div>
          <BellIcon className="h-6 w-6 " />
        </div> */}
        <Link href="/cart" passHref>
          <div className="relative cart-icon h-10 w-10 bg-yellow-500 flex items-center justify-center rounded-xl mr-2 ">
            <div className="cart-item-number text-gray-800 text-xs absolute -top-1 -right-1 h-4 w-4 bg-white rounded-full flex justify-center items-center">
              {/* {cart_Items.length || '0'} */}
              {cart_Items?.length}
            </div>
            <ShoppingCartIcon className="h-6 w-6" />
          </div>
        </Link>

        <div>
          {user?.username ? (
            <>
              <LogoutIcon className="h-6 w-6" onClick={logoutuser} />
            </>
          ) : (
            <Link href="/register">
              <UserIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
        <div className="h-12 w-12 rounded-full cursor-pointer">
          <Jdenticon size="45" value={user?.username} />
        </div>

        <p className="text-xs inline cursor-pointer">{user?.username}</p>
      </div>
    </div>
  );
};

// export default Header;
export default dynamic(() => Promise.resolve(Header), { ssr: false });
