import { ChevronRightIcon, ClockIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

export const SideBarDemo = () => {
  const [open, setopen] = useState(true);
  return (
    <div className="flex ">
      <div className="top-16 fixed">
        <div
          className={`${
            open ? 'w-72' : 'w-20'
          } h-screen bg-dark-purple relative pt-8 p-5   duration-300 `}
        >
          <span onClick={() => setopen(!open)}>
            <ChevronRightIcon
              className={`h-6 w-6 absolute cursor-pointer -right-3 top-9 border-2 border-dark-purple rounded-full bg-white ${
                !open && 'rotate-180'
              }`}
            />
          </span>

          <div className="flex gap-x-4 items-center">
            <div className="h-7 w-7 rounded-xl cursor-pointer bg-blue-500">
              <ClockIcon className="h-6 w-6 " />
            </div>
            <h1
              className={`text-white origin-left font-medium text-xl duration-300 ${
                !open && 'scale-0'
              }`}
            >
              Home
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
