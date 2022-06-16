// import { Box, Card, Container, Grid, Hidden, Paper } from '@mui/material';
// import { makeStyles } from '@mui/styles';
// import Head from 'next/head';
// import { useRouter } from 'next/router';

// import Header from '../../components/Header';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(0),
//     borderRadius: '0',
//   },
//   paperImagePreview: {
//     paddingTop: 30,
//   },
//   paperImage: {
//     padding: theme.spacing(0),
//     borderRadius: '0',
//     marginLeft: 25,
//     ['@media (max-width:600px)']: {
//       marginLeft: -20,
//       marginRight: -20,
//     },
//   },
//   paperRight: {
//     padding: theme.spacing(0),
//     borderRadius: '0',
//     paddingLeft: 40,
//     paddingTop: 30,
//     ['@media (max-width:600px)']: {
//       paddingLeft: 0,
//       paddingTop: 10,
//     },
//   },
//   img: {
//     maxWidth: '100%',
//   },
// }));

// function Product({ product, categories }) {
//   const classes = useStyles();
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Head>
//         <title>{product.title}</title>
//       </Head>
//       <Header />
//       <div className=" bg-gray-200 h-screen">
//         <Container maxWidth="md">
//           <Card>
//             <Grid container spacing={0}>
//               <Hidden only={['xs', 'sm']}>
//                 <Grid item sm={1}>
//                   <Paper className={classes.paperImagePreview} elevation={0}>
//                     {product.product_image.map((c) => (
//                       <div key={c.id}>
//                         <Paper className={classes.paperImage} elevation={0}>
//                           <img
//                             src={product.product_image[0].image}
//                             alt={product.product_image[0].alt_text}
//                             className={classes.img}
//                           />
//                         </Paper>
//                       </div>
//                     ))}
//                   </Paper>
//                 </Grid>
//               </Hidden>
//               <Grid item xs={12} sm={6}>
//                 <Paper className={classes.paperImage} elevation={0}>
//                   <img
//                     src={product.product_image[0].image}
//                     alt={product.product_image[0].alt_text}
//                     className={classes.img}
//                   />
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} sm={5}>
//                 <Paper className={classes.paperRight} elevation={0}>
//                   <Box component="h1" fontSize={18} fontWeight="400">
//                     {product.title}
//                   </Box>
//                   <Box component="p" fontSize={22} fontWeight="900" m={0}>
//                     £{product.regular_price}
//                   </Box>
//                   <Box component="p" m={0} fontSize={14}>
//                     Free Delivery & Returns (Ts&Cs apply)
//                   </Box>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Card>
//         </Container>
//       </div>
//     </>
//   );
// }

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { slug: 'always-cup' } }],
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   // https://semuna-api.herokuapp.com/
//   // const res = await fetch(`http://127.0.0.1:8001/api/product/${params.slug}`);
//   const res = await fetch(
//     `https://semuna-api.herokuapp.com/api/product/${params.slug}`
//   );

//   const product = await res.json();

//   const ress = await fetch('https://semuna-api.herokuapp.com/api/category');
//   const categories = await ress.json();

//   return {
//     props: {
//       product,
//       categories,
//     },
//   };
// }

// export default Product;
