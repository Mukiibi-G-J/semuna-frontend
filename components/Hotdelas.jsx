import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../context/store';

export const Hotdeals = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const addCartHandler = (product) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product } });
  };
  return (
    <div className="main-section-deals mt-5">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">Hot Deals 🔥</h1>
      <div className="main-section-products flex flex-wrap space-x-4 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="main-product">
            <Link href={`product/${encodeURIComponent(product.slug)}`}>
              <a>
                <div className="product-image w-48 h-52 bg-white rounded-lg p-4">
                  <img
                    className="w-full h-full object-contain"
                    src={product.product_image[0].image}
                    alt={product.product_image[0].alt}
                  />
                </div>
              </a>
            </Link>
            <div className="product-name text-gray-700 font-bold mt-2 text-sm">
              {product.description}(2019)
            </div>
            <div className="product-make text-green-700 font-bold">
              {product.title}
            </div>
            <div className="product-rating text-yellow-300 font-bold my-1">
              ⭐⭐⭐⭐⭐ 4.5
            </div>
            <div className="product-price font-bold text-gray-700 text-lg">
              {product.regular_price}
            </div>
            <div>
              <button
                onClick={() => addCartHandler(product)}
                className="bg-[#FFCC00]  px-4 py-2 rounded-xl  hover:bg-yellow-500"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
