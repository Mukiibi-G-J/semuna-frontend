import {
  BookOpenIcon,
  CameraIcon,
  DeviceMobileIcon,
  GiftIcon,
  HomeIcon,
  LightBulbIcon,
  MusicNoteIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';

import React from 'react';

const Banner = () => {
  return (
    // <div className="main-section z-0   flex-1 p-6 bg-gray-200">
    <>
      <div className="  object-cover main-section-banner h-44 rounded-lg flex items-end bg-red-500">
        <div className="button bg-white w-36 h-10 rounded-full flex justify-center items-center m-4 cursor-pointer">
          <h4 className="text-bold text-yellow-500">Browse Products</h4>
        </div>
      </div>
      <div className="main-section-categories mt-10 ">
        <h1 className="popular-categories font-bold text-gray-700 text-2xl flex items-center">
          Popular Categories
          <StarIcon className="h-6 w-6 text-yellow-400" />
        </h1>
        <div className="categories flex flex-wrap">
          <div className="icon-home h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <HomeIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-gift h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <GiftIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-phone h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <DeviceMobileIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-book h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <BookOpenIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-camera h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <CameraIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-music h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <MusicNoteIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="icon-buld h-20 w-20 bg-white rounded-xl flex justify-center items-center mt-5 mr-6">
            <LightBulbIcon className="h-12 w-12 text-gray-500" />
          </div>
        </div>
      </div>
    </>
    // </div>
  );
};

export default Banner;
