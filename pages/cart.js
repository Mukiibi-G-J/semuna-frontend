import React from 'react';
import { useContext } from 'react';
import Header from '../components/Header';
import { Store } from '../context/store';

const Cart = ({ categories }) => {
  const { state } = useContext(Store);
  const {
    cart: { cart_Items },
  } = state;

  return (
    <>
      <Header />
      <div className="main-section flex-1 p-6 bg-white">
        <h1 className="font-bold text-gray-400 text-3xl mb-6">Shopping Cart</h1>
        <div className="font-bold text-gray-400 table-titles flex">
          <h2 className="flex-grow">Product</h2>
          <h2 className="w-48">Count</h2>
          <h2 className="w-48">Total Cost</h2>
          <span className="w-10" />
        </div>
        <div className="cart-items mt-5">
          {cart_Items.map((product) => (
            <div
              key={product}
              className="cart-item flex items-center pb-4 border-b border-gray-100"
            >
              <div className="cart-item-image w-40 h-24 bg-white p-4 rounded-lg">
                <img
                  className="w-full h-full object-contain"
                  src={product.product_image[0].image}
                />
              </div>
              <div className="cart-item-details flex-grow">
                <div className="cart-item-title font-bold text-sm text-gray-600">
                  {product.description}
                </div>
                <div className="cart-item-brand text-sm text-gray-400">
                  {product.title}
                </div>
              </div>
              <div className="cart-item-counter w-48 flex items-center">
                <div className="chevron-left text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 mr-2 cursor-pointer">
                  <i className="fas fa-chevron-left fa-xs" />
                </div>
                <h4 className="text-gray-400">x1</h4>
                <div className="chevron-right text-gray-400 bg-gray-100 rounded h-6 w-6 flex justify-center items-center hover:bg-gray-200 ml-2 cursor-pointer">
                  <i className="fas fa-chevron-right fa-xs" />
                </div>
              </div>
              <div className="cart-item-total-cost w-48 font-bold text-gray-400">
                {product.regular_price}
              </div>
              <div className="cart-item-delete w-10 font-bold text-gray-300 cursor-pointer hover:text-gray-400">
                <i className="fas fa-times" />
              </div>
            </div>
          ))}
        </div>
        <div className="complete-order flex justify-end mt-10">
          <div className="total-cost mr-7">
            <h2 className="text-gray-400">Total Cost</h2>
            <div className="text-gray-600 font-bold total-cost-number text-3xl">
              $1,439.00
            </div>
          </div>
          <div className="complete-order-button w-56 flex items-center justify-center bg-yellow-500 rounded text-white cursor-pointer hover:bg-yellow-600">
            Complete Order
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

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
