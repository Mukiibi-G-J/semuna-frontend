import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CheckoutWizard from '../components/CheckoutWizard';
import { Store } from '../context/store';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';

function Payments() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const router = useRouter();
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!selectedPaymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
      Cookies.set('paymentMethod', JSON.stringify(selectedPaymentMethod));
      router.push('/placeorder');
    }
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
    setSelectedPaymentMethod(Cookies.get('paymentMethod') || '');
    console.log(selectedPaymentMethod);
  }, [paymentMethod]);

  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <div className="max-w-screen-md mx-auto ">
        <form onSubmit={submitHandler}>
          <h1 className="mb-4 text-xl"> Payment methhod</h1>
          {[
            'PayPal',
            'Stripe',
            'MTN-Mobile-Money',
            'Airtel-Mobile-Money',
            'Cash-On-Delivery',
          ].map((payment) => (
            <div key={payment} className="mb-4">
              <input
                type="radio"
                id={payment}
                className="p-2 outline-none focus:ring-0"
                name="payment"
                checked={selectedPaymentMethod === payment}
                onChange={() => {
                  setSelectedPaymentMethod(payment);
                  console.log(payment);
                }}
              />
              <label className="p-2 " htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="px-4 py-2 items-center justify-center bg-yellow-500 rounded cursor-pointer hover:bg-yellow-600"
              onClick={() => router.push('/shipping')}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 items-center justify-center bg-yellow-500 rounded cursor-pointer hover:bg-yellow-600"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Payments;
