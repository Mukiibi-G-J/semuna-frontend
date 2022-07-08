import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import CheckoutWizard from '../components/CheckoutWizard';
import { Store } from '../context/store';
import axios from 'axios';

function PlaceOrder() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cart_Items, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cart_Items.reduce((a, c) => a + c.quantity * c.regular_price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payments');
    }
  }, [paymentMethod, router]);

  // const placeOrderHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post('/api/orders', {
  //       orderItems: cartItems,
  //       shippingAddress,
  //       paymentMethod,
  //       itemsPrice,
  //       shippingPrice,
  //       taxPrice,
  //       totalPrice,
  //     });
  //     const { response } = fetch(`http://localhost:8001/api/orders`, {
  //       method: 'POST',
  //       headers: {
  //         // here we are telling the backend it json data
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         "user": 13,

  //         "fullName": "Joseph Mukiibi",
  //         "address": "kampala",
  //         "city": "kampala",
  //         "postalCode": "kampala",
  //         "country": "Uganda",
  //         "product":[3,2]
  //         orderItems: cart_Items,
  //         shippingAddress: e.target.second_name.value,
  //         paymentMethod: paymentMethod,
  //         shippingPrice:shippingPrice ,
  //         taxPrice: taxPrice,
  //         totalPrice: totalPrice,
  //       }),
  //     });
  //     setLoading(false);
  //     dispatch({ type: 'CART_CLEAR_ITEMS' });
  //     Cookies.set(
  //       'cart',
  //       JSON.stringify({
  //         ...cart,
  //         cartItems: [],
  //       })
  //     );
  //     router.push(`/order/${data._id}`);
  //   } catch (err) {
  //     setLoading(false);
  //     toast.error(getError(err));
  //   }
  // };

  const [loading, setLoading] = useState(false);
  return (
    <div>
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl px-20">Place Order</h1>
      {/* {cart_Items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : ( */}
      <div className="grid md:grid-cols-4 md:gap-5 px-20">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card  p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress.fullName}, {shippingAddress.address},{' '}
              {shippingAddress.city}, {shippingAddress.postalCode},{' '}
              {shippingAddress.country}
            </div>
            <div>
              <Link href="/shipping">Edit</Link>
            </div>
          </div>

          <div className="card  p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{paymentMethod}</div>
            <div>
              <Link href="/payment">Edit</Link>
            </div>
          </div>
          <div className="card overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="    p-5 text-right">Quantity</th>
                  <th className="  p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart_Items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.product_image[0].image}
                            alt={item.product_image[0].alt}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.title}
                        </a>
                      </Link>
                    </td>
                    <td className=" p-5 text-right">{item.quantity}</td>
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <td className="p-5 text-right">{value}</td>
                        </>
                      )}
                      decimalScale={0}
                      value={item.regular_price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                    <CurrencyFormat
                      renderText={(value) => (
                        <>
                          <td className="p-5 text-right">{value}</td>
                        </>
                      )}
                      decimalScale={0}
                      value={item.quantity * item.regular_price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Link href="/cart">Edit</Link>
            </div>
          </div>
        </div>

        <div>
          <div className="card  p-5">
            <h2 className="mb-2 text-lg">Order Summary</h2>
            <ul>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Items</div>
                  <div>
                    <CurrencyFormat
                      renderText={(value) => <>{value}</>}
                      decimalScale={0}
                      value={itemsPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Tax</div>
                  <div>
                    <CurrencyFormat
                      renderText={(value) => <>{value}</>}
                      decimalScale={0}
                      value={taxPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Shipping</div>
                  <div>
                    <CurrencyFormat
                      renderText={(value) => <>{value}</>}
                      decimalScale={0}
                      value={shippingPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="mb-2 flex justify-between">
                  <div>Total</div>
                  <div>
                    <CurrencyFormat
                      renderText={(value) => <>{value}</>}
                      decimalScale={0}
                      value={totalPrice}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'UGX'}
                    />
                  </div>
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  // onClick={placeOrderHandler}
                  // className="primary-button "
                  className="w-full flex h-10 items-center justify-center bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600"
                >
                  {loading ? 'Loading...' : 'Place Order'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* // {/* )} * */}
    </div>
  );
}

export default PlaceOrder;
