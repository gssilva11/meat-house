// import React from 'react';
// import { Card, CardContent, Typography, Button, Box } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import VanillaTilt from 'vanilla-tilt';

// const Tilt = ({ children }) => {
//   const tiltRef = React.useRef();

//   React.useEffect(() => {
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

//   return <div ref={tiltRef} style={{ display: 'inline-block' }}>{children}</div>;
// };

// const Cards = ({ products, handleOpen, getImagePath }) => {
//   return products.map(product => (
//     <Tilt key={product.id}>
//       <Card
//         sx={{
//           width: '200px',
//           height: '275px',
//           backgroundColor: '#010203',
//           border: '1px solid #33363d',
//           boxShadow: '1px 2px 3.5px #121212',
//         }}
//       >
//         <div style={{ position: 'relative', padding: '16px' }}>
//           <Typography variant="h6" sx={{ color: '#f0f0f0' }}>{product.name}</Typography>
//         </div>
//         <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <img
//             src={getImagePath(product.imageProduct)}
//             alt={product.name}
//             loading="lazy"
//             style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '11px 0 11px 0' }}
//           />
//         </div>
//         <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//           <div>
//             <Typography sx={{ color: '#f0f0f0' }} variant="body2">Preço (Kg):</Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography sx={{ color: '#f0f0f0' }} variant="h6">R${product.price}</Typography>
//               <Button
//                 variant="contained"
//                 color="warning"
//                 aria-label="Adicionar ao carrinho"
//                 sx={{ fontWeight: 600 }}
//                 onClick={() => handleOpen(product)}
//               >
//                 <ShoppingCartIcon />
//               </Button>
//             </Box>
//           </div>
//         </CardContent>
//       </Card>
//     </Tilt>
//   ));
// };

// export default Cards;
