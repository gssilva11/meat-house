// import React, { useState, useEffect, useRef } from 'react';
// import VanillaTilt from 'vanilla-tilt';
// import { Card, CardContent, Typography, Button, Box, Modal, List, ListItem, ListItemText, IconButton } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ProductModal from './ProductModal';
// import myfetch from '../utils/myfetch';
// import Buttons from './Buttons'; // Import the Buttons component
// import detalheIcon from '../assets/logo/tituloDetalhe.png'; // Importando a imagem do detalhe

// const getImagePath = (imageProduct) => {
//   return `${imageProduct}`;
// };

// const Tilt = ({ children }) => {
//   const tiltRef = useRef();

//   useEffect(() => {
//     const tiltNode = tiltRef.current;
//     VanillaTilt.init(tiltNode, {
//       max: 2.5,
//       speed: 500,
//       glare: true,
//       'max-glare': 0.1,
//     });

//     return () => {
//       tiltNode.vanillaTilt.destroy();
//     };
//   }, []);

//   return (
//     <div ref={tiltRef} style={{ display: 'inline-block' }}>
//       {children}
//     </div>
//   );
// };

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [expandedCategory, setExpandedCategory] = useState(null);

//   const [cartItems, setCartItems] = useState([]);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [productModalOpen, setProductModalOpen] = useState(false);
//   const [selectedProductIndex, setSelectedProductIndex] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await myfetch.get('product');
//         setProducts(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleOpen = (product) => {
//     setSelectedProduct(product);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleExpandCategory = (category) => {
//     setExpandedCategory(category === expandedCategory ? null : category);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const addToCart = (product) => {
//     setCartItems([...cartItems, product]);
//     setOpen(false);
//   };

//   const updateItem = (index) => {
//     setSelectedProductIndex(index);
//     setProductModalOpen(true);
//   };

//   const removeItem = (index) => {
//     setCartItems(cartItems.filter((_, i) => i !== index));
//   };

//   const proceedToCheckout = () => {
//     const cartData = JSON.stringify(cartItems);
//     console.log(cartData);
//     localStorage.setItem('orders', cartData); // Simular envio de pedidos
//     setCartOpen(false);
//     window.location.href = '/requests'; // Redirecionar para a página de Requests
//   };

//   const groupedProducts = products.reduce((acc, product) => {
//     acc[product.category] = acc[product.category] || [];
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   return (
//     <div style={{ margin: '2% 10% 5% 10%' }}>
//       <Buttons onExpandCategory={handleExpandCategory} /> {/* Pass the function as a prop */}
//       {Object.keys(groupedProducts).map((category, index) => (
//         (expandedCategory === null || expandedCategory === category) && (
//           <React.Fragment key={category}>
//             <div style={{ marginBottom: '40px', textAlign: 'left' }}>
//               {expandedCategory === category && (
//                 <Button
//                   startIcon={<ArrowBackIcon />}
//                   onClick={() => setExpandedCategory(null)}
//                   sx={{ 
//                     color: '#f0f0f0', 
//                     marginBottom: '16px',
//                     textDecoration: 'underline',
//                     backgroundColor: '#0f0f0f',
//                   }}
//                 >
//                   Voltar
//                 </Button>
//               )}
//               <Typography 
//                 variant="h4" 
//                 sx={{ 
//                   color: '#f0f0f0', 
//                   marginBottom: '16px', 
//                   textAlign: expandedCategory ? 'left' : 'center',
//                   marginTop: expandedCategory ? '0' : '40px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//               >
//                 <img src={detalheIcon} alt="detalhe" style={{ marginRight: '15px', height:'25px' }} />
//                 {category}
//                 <img src={detalheIcon} alt="detalhe" style={{ marginLeft: '15px', height:'25px' }} />
//               </Typography>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
//                 {(expandedCategory === category ? groupedProducts[category] : groupedProducts[category].slice(0, 4)).map(product => (
//                   <Tilt key={product.id}>
//                     <Card
//                       sx={{
//                         width: '200px', // Reduzindo o tamanho do card em 20%
//                         height: '275px',
//                         backgroundColor: '#010203',
//                         border: '1px solid #33363d',
//                         boxShadow: '1px 2px 3.5px #121212',
//                       }}
//                     >
//                       <div style={{ position: 'relative', padding: '16px' }}>
//                         <Typography variant="h6" sx={{ color: '#f0f0f0' }}>{product.name}</Typography>
//                       </div>
//                       <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                         <img
//                           src={getImagePath(product.imageProduct)}
//                           alt={product.name}
//                           loading="lazy"
//                           style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '11px 0 11px 0' }}
//                         />
//                       </div>
//                       <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                         <div>
//                           <Typography sx={{ color: '#f0f0f0' }} variant="body2">Preço (Kg):</Typography>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                             <Typography sx={{ color: '#f0f0f0' }} variant="h6" >
//                               R${product.price}
//                             </Typography>
//                             <Button
//                               variant="contained"
//                               color="warning"
//                               aria-label="Adicionar ao carrinho"
//                               sx={{ fontWeight: 600 }}
//                               onClick={() => handleOpen(product)}
//                             >
//                               <ShoppingCartIcon />
//                             </Button>
//                           </Box>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </Tilt>
//                 ))}
//                 {expandedCategory !== category && (
//                   <Tilt>
//                     <Card
//                       sx={{
//                         width: '200px', // Reduzindo o tamanho do card em 20%
//                         height: '275px',
//                         backgroundColor: '#010203',
//                         border: '1px dotted #33363d',
//                         boxShadow: '1px 2px 3.5px #121212',
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         cursor: 'pointer',
//                       }}
//                       onClick={() => handleExpandCategory(category)}
//                     >
//                       <Typography variant="h6" sx={{ color: '#f0f0f0', textDecoration:'underline' }}>Ver mais produtos!</Typography>
//                     </Card>
//                   </Tilt>
//                 )}
//               </div>
//             </div>
//             <div style={{ padding: '15px' }}></div>
//           </React.Fragment>
//         )
//       ))}
//       <Button onClick={() => setCartOpen(true)} variant="contained" color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
//         Ver Carrinho
//       </Button>
//       {selectedProduct && (
//         <ProductModal
//           open={open}
//           onClose={handleClose}
//           product={selectedProduct}
//           onAddToCart={addToCart}
//         />
//       )}
//       <Modal open={cartOpen} onClose={() => setCartOpen(false)}>
//         <Box sx={{ width: '80%', margin: 'auto', mt: '10%', bgcolor: 'background.paper', p: 2 }}>
//           <Typography variant="h4">Carrinho de Compras</Typography>
//           <List>
//             {cartItems.map((item, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={item.name} secondary={`Preço: R$${item.price}`} />
//                 <IconButton edge="end" aria-label="edit" onClick={() => updateItem(index)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton edge="end" aria-label="delete" onClick={() => removeItem(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//           </List>
//           <Button onClick={proceedToCheckout} variant="contained" color="primary">
//             Prosseguir para o Checkout
//           </Button>
//         </Box>
//       </Modal>
//       {selectedProductIndex !== null && (
//         <ProductModal
//           open={productModalOpen}
//           onClose={() => setProductModalOpen(false)}
//           product={cartItems[selectedProductIndex]}
//           onAddToCart={(updatedProduct) => {
//             const updatedCartItems = [...cartItems];
//             updatedCartItems[selectedProductIndex] = updatedProduct;
//             setCartItems(updatedCartItems);
//             setProductModalOpen(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Products;
