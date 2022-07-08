import Link from 'next/link';
import React, { useState } from 'react';
import { useContext } from 'react';

import Image from 'next/image';
import Header from '../components/Header';
import { Store } from '../context/store';
import dynamic from 'next/dynamic';
import { MinusSmIcon, PlusIcon, PlusSmIcon } from '@heroicons/react/solid';
import CurrencyFormat from 'react-currency-format';
import { TrashIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const items = {
  instock: 20,
};
const Cart = ({ categories }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cart_Items },
  } = state;
  const [count, setCount] = useState(0);
  const router = useRouter();
  const updateCartHandler = (item, quantity) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <>
      <Header />
      <div className="main-section flex-1 p-6 bg-white">
        <h1 className="font-bold text-gray-400 text-3xl mb-6">Shopping Cart</h1>
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart_Items.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.product_image[0].image}
                            alt={item.title}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.title}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, parseInt(e.target.value))
                        }
                      >
                        {[...Array(items.instock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
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
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="shadow-md rounded-md h-40 p-5">
            <ul>
              <li>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <div className="pb-3 text-xl">
                        Subtotal (
                        {cart_Items.reduce((a, c) => a + c.quantity, 0)})<br />
                        {value}
                      </div>
                    </>
                  )}
                  decimalScale={0}
                  value={cart_Items.reduce(
                    (a, c) => a + c.quantity * c.regular_price,
                    0
                  )}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'UGX'}
                />
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="w-56 flex h-10 items-center justify-center bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// export default Cart;
export default dynamic(() => Promise.resolve(Cart), { ssr: false });

export async function getStaticProps({ params }) {
  // const res = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
  // const products = await res.json();
  // /`${process.env.url}/;
  // const `ess = await fetch('http://127.0.0.1:8001/api/category');
  const ress = await fetch(`${process.env.url}/api/category`);

  const categories = await ress.json();

  return {
    props: {
      categories,
    },
  };
}
