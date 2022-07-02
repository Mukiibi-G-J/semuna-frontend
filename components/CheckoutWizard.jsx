import {
  CashIcon,
  ClipboardCheckIcon,
  UsersIcon,
} from '@heroicons/react/outline';
import { CheckIcon, HomeIcon, UserIcon } from '@heroicons/react/solid';
import React from 'react';
import Header from './Header';
const login = <UserIcon className="w-full h-full" />;
const ship = <HomeIcon className="w-full h-full" />;
const payment = <CashIcon className="w-full h-full" />;
const order = <ClipboardCheckIcon className="w-full h-full" />;
const data = [
  {
    name: 'User Login',
    icon: login,
  },
  {
    name: 'Shipping Address',
    icon: ship,
  },
  {
    name: 'Payment Method',
    icon: payment,
  },
  {
    name: 'Place Order',
    icon: order,
  },
];

const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <>
      {/* component */}
      <Header />
      <div className="p-5">
        <div className="mx-4 p-4">
          <div className="flex items-center">
            {data.map((step, index) => (
              <>
                <div className="flex items-center text-teal-600 relative">
                  <div
                    className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                      index <= activeStep
                        ? 'border-teal-600 text-teal-600'
                        : 'border-gray-300 text-gray-300'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div
                    className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                      index <= activeStep ? 'text-teal-600' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </div>
                </div>
                <div
                  className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    index <= activeStep
                      ? 'border-teal-600'
                      : ' border-gray-300 '
                  } `}
                />
              </>
            ))}
            <div className="flex items-center text-teal-600 relative">
              <div
                className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 `}
              >
                <CheckIcon className="w-full h-full" />
              </div>
              <div
                className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase `}
              >
                Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutWizard;
