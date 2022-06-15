import { ViewGridIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../context/store';
import { useRouter } from 'next/router';

const SiderBar = ({ categories }) => {
  const { state, dispatch } = useContext(Store);
  //   const { categories } = state;
  const router = useRouter();
  // console.log(categories);
  //   const handlerCategory = (option) => {
  //     router.push(`category/${encodeURIComponent(option.slug)}`);
  //   };
  return (
    <div className="main-sidebar  w-1/5 border-t-2 border-gray-700  bg-gray-900 p-6  top-0 z-50 sticky">
      <div className="siderbar-categories">
        <div className="sidebar-main-category text-yellow-500 cursor-pointer flex font-bold p-2 bg-gray-700 rounded-lg">
          <span className="w-8">
            <ViewGridIcon className="h-8 w-8" />
          </span>
          <span className="text-xl ml-2">Categories</span>
        </div>
        {categories.map((option) => (
          <Link
            key={option.name}
            href={`/category/${encodeURIComponent(option.slug)}`}
          >
            <a>
              <div className="sidebar-main-category mt-2 text-white cursor-pointer flex font-bold p-2 hover:bg-gray-700 rounded-lg">
                <span className="w-8"></span>
                <span> {option.name}</span>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SiderBar;
