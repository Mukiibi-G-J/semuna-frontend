import { Box, Card, Container, Grid, Hidden, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import Header from '../../components/Header';
import { Store } from '../../context/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    borderRadius: '0',
  },
  paperImagePreview: {
    paddingTop: 30,
  },
  paperImage: {
    padding: theme.spacing(0),
    borderRadius: '0',
    marginLeft: 25,
    ['@media (max-width:600px)']: {
      marginLeft: -20,
      marginRight: -20,
    },
  },
  paperRight: {
    padding: theme.spacing(0),
    borderRadius: '0',
    paddingLeft: 40,
    paddingTop: 30,
    ['@media (max-width:600px)']: {
      paddingLeft: 0,
      paddingTop: 10,
    },
  },
  img: {
    maxWidth: '100%',
  },
}));

function Product({ product, categories }) {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const addCartHandler = (product) => {
    const existItem = state.cart.cart_Items.find(
      (x) => parseInt(x.id) === parseInt(product.id)
    );

    const quantity = existItem ? parseInt(existItem.quantity) + 1 : 1;

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Header />
      <div className=" bg-gray-200 h-screen flex justify-center  p-20">
        <div className="flex items-center space-x-4 w-[800px] shadow-md bg-white">
          <div>
            {product.product_image.map((c) => (
              <div key={c.id}>
                <div>
                  <img
                    src={product.product_image[0].image}
                    alt={product.product_image[0].alt_text}
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-28 h-18">
                    <img
                      src={product.product_image[0].image}
                      alt={product.product_image[0].alt_text}
                      className="w-ful h-full"
                    />
                  </div>
                  <div className="w-28 h-18">
                    <img
                      src={product.product_image[0].image}
                      alt={product.product_image[0].alt_text}
                      className="w-ful h-full"
                    />
                  </div>
                </div>
              </div>

              // </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xl font-mono text-bold">{product.title}</p>
            <p className="text-xl font-mono text-bold">{product.description}</p>
            <p>
              Brand:{product.brand} | Similar products from {product.brand}
            </p>
            <p>UGX:{product.regular_price}</p>
            <div className="product-rating text-yellow-300 font-bold my-1">
              ⭐⭐⭐⭐⭐ 4.5
            </div>
            <button
              onClick={() => addCartHandler(product)}
              className="bg-[#FFCC00]  px-4 py-2 rounded-md  hover:bg-yellow-500"
            >
              Add to Cart
            </button>
            <p>Free Delivery & Returns (Ts&Cs apply)</p>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'always-cup' } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  //`${process.env.url}/
  // const `es = await fetch(`http://127.0.0.1:8001/api/product/${params.slug}`);
  const res = await fetch(`${process.env.url}/api/product/${params.slug}`);

  const product = await res.json();

  const ress = await fetch(`${process.env.url}/api/category`);
  const categories = await ress.json();

  return {
    props: {
      product,
      categories,
    },
  };
}

export default Product;
