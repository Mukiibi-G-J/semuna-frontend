import React from 'react';
import Header from '../../components/Header';
import SiderBar from '../../components/Sidebar';

const Category = ({ products, categories }) => {
  return (
    <div className="h-screen bg-gray-200">
      <Header />
      <div className="main flex">
        <SiderBar categories={categories} />
        <div className="main-section z-0   flex-1 p-6 bg-gray-200">
          <div className="main-section-deals mt-5">
            <h1 className="text-2xl font-bold text-gray-700 mb-5">
              Hot Deals 🔥
            </h1>
            <div className="main-section-products flex flex-wrap space-x-4">
              {products.map((product) => (
                <div key={product.id} className="main-product">
                  <div className="product-image w-48 h-52 bg-white rounded-lg p-4">
                    <img
                      className="w-full h-full object-contain"
                      src={product.product_image[0].image}
                      alt={product.product_image[0].alt}
                    />
                  </div>
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'supermarket' } }, { params: { slug: 'home' } }],

    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.url}/api/category/${params.slug}`);
  const products = await res.json();
  const ress = await fetch(`${process.env.url}/api/category`);
  const categories = await ress.json();

  return {
    props: {
      products,
      categories,
    },
  };
}
