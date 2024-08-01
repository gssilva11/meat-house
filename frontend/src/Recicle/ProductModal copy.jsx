// // // import React, { useState } from 'react';
// // // import {
// // //   Box,
// // //   Grid,
// // //   TextField,
// // //   Typography,
// // //   Button,
// // //   Divider,
// // //   Container,
// // //   Paper,
// // // } from '@mui/material';
// // // import Navbar from '../components/Navbar';
// // // import Notification from '../components/Notification';
// // // import logo from '../assets/logo/logo.png'; // Certifique-se de que o caminho está correto
// // // import InputMask from 'react-input-mask';
// // // import Customer from '../models/Customer';

// // // const LoginCadastro = () => {
// // //   const [formData, setFormData] = useState({
// // //     name: '',
// // //     ident_document: '',
// // //     birth_date: '',
// // //     phone: '',
// // //     email: '',
// // //     senha: '',
// // //     confirmarSenha: '',
// // //   });

// // //   const [notification, setNotification] = useState({
// // //     open: false,
// // //     message: '',
// // //     severity: 'success',
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prevData) => ({
// // //       ...prevData,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   const handleNotificationClose = () => {
// // //     setNotification((prev) => ({
// // //       ...prev,
// // //       open: false,
// // //     }));
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!formData.birth_date) {
// // //       setNotification({
// // //         open: true,
// // //         message: 'Data de nascimento é obrigatória',
// // //         severity: 'error',
// // //       });
// // //       return;
// // //     }

// // //     const customerData = {
// // //       ...formData,
// // //       birth_date: new Date(formData.birth_date), // Converter para objeto Date
// // //     };

// // //     try {
// // //       const validData = Customer.parse(customerData);
// // //       setNotification({
// // //         open: true,
// // //         message: 'Cadastro realizado com sucesso!',
// // //         severity: 'success',
// // //       });
// // //       alert(JSON.stringify(validData, null, 2));
// // //     } catch (e) {
// // //       console.error('Erro na validação:', e.errors);
// // //       setNotification({
// // //         open: true,
// // //         message: 'Erro na validação dos dados. Por favor, verifique os campos e tente novamente.',
// // //         severity: 'error',
// // //       });
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Navbar />
// // //       <Container maxWidth="lg">
// // //         <Box sx={{ my: 4 }}>
// // //           <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
// // //             <img src={logo} alt="Casa de Carnes Logo" style={{ height: '100px' }} />
// // //           </Box>
// // //           <Paper variant="elevation" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#020002' }}>
// // //             <Grid container spacing={0} justifyContent="center">
// // //               <Grid item xs={12} md={7}>
// // //                 <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0' }}>
// // //                   Cadastrar-se
// // //                 </Typography>
// // //                 <Paper variant="outlined" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#272727', borderColor: '#b0b0b0', borderWidth: 1 }}>
// // //                   <Typography variant="h6" gutterBottom sx={{ color: '#f0f0f0' }}>
// // //                     Dados Pessoais
// // //                   </Typography>
// // //                   <Grid container spacing={1}>
// // //                     <Grid item xs={12} md={8}>
// // //                       <TextField
// // //                         required
// // //                         fullWidth
// // //                         label="Nome"
// // //                         margin="normal"
// // //                         variant="outlined"
// // //                         name="name"
// // //                         value={formData.name}
// // //                         onChange={handleChange}
// // //                         InputLabelProps={{
// // //                           shrink: true,
// // //                           style: { color: '#f0f0f0' },
// // //                         }}
// // //                         InputProps={{ style: { height: '40px' } }}
// // //                       />
// // //                     </Grid>
// // //                     <Grid item xs={12} md={4}>
// // //                       <InputMask
// // //                         mask="999.999.999-99"
// // //                         maskChar=" "
// // //                         value={formData.ident_document}
// // //                         onChange={handleChange}
// // //                       >
// // //                         {() => (
// // //                           <TextField
// // //                             required
// // //                             fullWidth
// // //                             label="CPF"
// // //                             margin="normal"
// // //                             variant="outlined"
// // //                             name="ident_document"
// // //                             InputLabelProps={{
// // //                               shrink: true,
// // //                               style: { color: '#f0f0f0' },
// // //                             }}
// // //                             InputProps={{ style: { height: '40px' } }}
// // //                           />
// // //                         )}
// // //                       </InputMask>
// // //                     </Grid>
// // //                     <Grid item xs={12} md={6}>
// // //                       <TextField
// // //                         required
// // //                         fullWidth
// // //                         label="Data de Nascimento"
// // //                         margin="normal"
// // //                         variant="outlined"
// // //                         type="date"
// // //                         name="birth_date"
// // //                         value={formData.birth_date}
// // //                         onChange={handleChange}
// // //                         InputLabelProps={{ shrink: true, style: { color: '#f0f0f0' } }}
// // //                         InputProps={{ style: { height: '40px' } }}
// // //                       />
// // //                     </Grid>
// // //                     <Grid item xs={12} md={6}>
// // //                       <InputMask
// // //                         mask="(99) 99999-9999"
// // //                         maskChar=" "
// // //                         value={formData.phone}
// // //                         onChange={handleChange}
// // //                       >
// // //                         {() => (
// // //                           <TextField
// // //                             required
// // //                             fullWidth
// // //                             label="Telefone"
// // //                             margin="normal"
// // //                             variant="outlined"
// // //                             name="phone"
// // //                             InputLabelProps={{
// // //                               shrink: true,
// // //                               style: { color: '#f0f0f0' },
// // //                             }}
// // //                             InputProps={{ style: { height: '40px' } }}
// // //                           />
// // //                         )}
// // //                       </InputMask>
// // //                     </Grid>
// // //                     <Grid item xs={12}>
// // //                       <TextField
// // //                         required
// // //                         fullWidth
// // //                         label="Email"
// // //                         margin="normal"
// // //                         variant="outlined"
// // //                         type="email"
// // //                         name="email"
// // //                         value={formData.email}
// // //                         onChange={handleChange}
// // //                         InputLabelProps={{
// // //                           shrink: true,
// // //                           style: { color: '#f0f0f0' },
// // //                         }}
// // //                         InputProps={{ style: { height: '40px' } }}
// // //                       />
// // //                     </Grid>
// // //                     <Grid item xs={12} md={6}>
// // //                       <TextField
// // //                         required
// // //                         fullWidth
// // //                         label="Senha"
// // //                         margin="normal"
// // //                         variant="outlined"
// // //                         type="password"
// // //                         name="senha"
// // //                         value={formData.senha}
// // //                         onChange={handleChange}
// // //                         InputLabelProps={{
// // //                           shrink: true,
// // //                           style: { color: '#f0f0f0' },
// // //                         }}
// // //                         InputProps={{ style: { height: '40px' } }}
// // //                       />
// // //                     </Grid>
// // //                     <Grid item xs={12} md={6}>
// // //                       <TextField
// // //                         required
// // //                         fullWidth
// // //                         label="Confirmar Senha"
// // //                         margin="normal"
// // //                         variant="outlined"
// // //                         type="password"
// // //                         name="confirmarSenha"
// // //                         value={formData.confirmarSenha}
// // //                         onChange={handleChange}
// // //                         InputLabelProps={{
// // //                           shrink: true,
// // //                           style: { color: '#f0f0f0' },
// // //                         }}
// // //                         InputProps={{ style: { height: '40px' } }}
// // //                       />
// // //                     </Grid>
// // //                   </Grid>
// // //                   <Box sx={{ textAlign: 'center', mt: 2 }}>
// // //                     <Button
// // //                       variant="contained"
// // //                       color="primary"
// // //                       onClick={handleSubmit}
// // //                     >
// // //                       Cadastrar
// // //                     </Button>
// // //                   </Box>
// // //                 </Paper>
// // //               </Grid>
// // //               <Divider orientation="vertical" flexItem sx={{ mx: 5, borderColor: '#fff' }} />
// // //               <Grid item xs={12} md={3}>
// // //                 <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0' }}>
// // //                   Entrar
// // //                 </Typography>
// // //                 <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2, backgroundColor: '#840404', borderColor: '#b0b0b0', borderWidth: 1 }}>
// // //                   <form noValidate autoComplete="off">
// // //                     <TextField
// // //                       fullWidth
// // //                       label="Email"
// // //                       margin="normal"
// // //                       variant="outlined"
// // //                       type="email"
// // //                       InputLabelProps={{
// // //                         shrink: true,
// // //                         style: { color: '#f0f0f0' },
// // //                       }}
// // //                       InputProps={{ style: { height: '40px' } }}
// // //                     />
// // //                     <TextField
// // //                       fullWidth
// // //                       label="Senha"
// // //                       margin="normal"
// // //                       variant="outlined"
// // //                       type="password"
// // //                       InputLabelProps={{
// // //                         shrink: true,
// // //                         style: { color: '#f0f0f0' },
// // //                       }}
// // //                       InputProps={{ style: { height: '40px' } }}
// // //                     />
// // //                     <Button variant="contained" color="tertiary" sx={{ mt: 2, color: '#f0f0f0' }} fullWidth>
// // //                       Entrar
// // //                     </Button>
// // //                   </form>
// // //                 </Paper>
// // //               </Grid>
// // //             </Grid>
// // //           </Paper>
// // //         </Box>
// // //       </Container>
// // //       <Notification
// // //         open={notification.open}
// // //         handleClose={handleNotificationClose}
// // //         message={notification.message}
// // //         severity={notification.severity}
// // //       />
// // //     </>
// // //   );
// // // };

// // // export default LoginCadastro;


// // Importações necessárias para o componente
// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   Box,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   IconButton,
//   useMediaQuery,
//   useTheme
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import myfetch from '../utils/myfetch';

// // Mapeamento dos tamanhos
// const thicknessTypes = {
//   Pequeno: 'SMALL',
//   Médio: 'MEDIUM',
//   Grande: 'LARGE'
// };

// const ProductModal = ({ open, onClose, product, onAddToCart }) => {
//   const [quantity, setQuantity] = useState(100);
//   const [selectedCut, setSelectedCut] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [cuts, setCuts] = useState([]);
//   const [sizes, setSizes] = useState(Object.keys(thicknessTypes)); // Inicializando com os tamanhos predefinidos

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     if (product && open) {
//       const fetchData = async () => {
//         try {
//           const cutsData = await myfetch.get(`cuttingType`);
//           setCuts(cutsData);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       fetchData();
//     }
//   }, [product, open]);

//   const decreaseQuantityByKg = () => setQuantity(prev => Math.max(0, prev - 1000));
//   const decreaseQuantity = () => setQuantity(prev => Math.max(0, prev - 100));
//   const increaseQuantity = () => setQuantity(prev => prev + 100);
//   const increaseQuantityByKg = () => setQuantity(prev => prev + 1000);

//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       return; // Não faz nada se o tamanho não for selecionado
//     }

//     const selectedProduct = {
//       quantity,
//       id_product: product.id_product,
//       id_cuttingType: selectedCut.id_cuttingType,
//       thickness: thicknessTypes[selectedSize]
//     };

//     // Exibir o JSON do produto selecionado
//     alert(JSON.stringify(selectedProduct, null, 2));

//     // Chamar a função para adicionar ao carrinho
//     onAddToCart(selectedProduct);
    
//     // Fechar o modal
//     onClose();
//   };

//   const handleCutChange = (event) => {
//     const selectedCut = event.target.value;
//     setSelectedCut(selectedCut);
//   };

//   const handleSizeChange = (event) => {
//     setSelectedSize(event.target.value);
//   };

//   return (
//     <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: isMobile ? '80%' : 900,
//           height: isMobile ? 'auto' : 450,
//           bgcolor: 'background.paper',
//           border: '2px solid #020002',
//           boxShadow: 24,
//           p: 4,
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           alignItems: 'center',
//         }}
//       >
//         {product && (
//           <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
//             {!isMobile && (
//               <img
//                 src={product.imageProduct}
//                 alt={product.name}
//                 style={{ 
//                   width: '50%', 
//                   height: 'auto', 
//                   objectFit: 'contain', 
//                   marginRight: '16px', 
//                   border: '2px solid #000' // Borda da imagem
//                 }}
//               />
//             )}
//             <div style={{ flexGrow: 1, width: '50%' }}>
//               <IconButton
//                 onClick={onClose}
//                 sx={{ 
//                   color: '#F5F5F5', // Cor quase branca, altere se necessário
//                   position: 'absolute',
//                   top: 16,
//                   left: 16
//                 }}
//               >
//                 <ArrowBackIcon />
//               </IconButton>
//               <Typography id="modal-title" variant="h4" component="h2">
//                 {product.name}
//               </Typography>
//               <Typography id="modal-description" sx={{ mt: 2 }}>
//                 Preço por kg: R${product.price}
//               </Typography>
//               <Typography variant="h5" component="p" sx={{ mt: 1, fontWeight: 'bold' }}>
//                 Total: R${(product.price * quantity / 1000).toFixed(2)}
//               </Typography>
//               <Select
//                 value={selectedCut}
//                 onChange={handleCutChange}
//                 displayEmpty
//                 fullWidth
//                 sx={{ 
//                   mt: 2,
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#020002',  // Default
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#C62828',    // Passar o mouse
//                     cursor: selectedCut === 'Peça Inteira' || selectedCut === 'Moída' ? 'not-allowed' : 'pointer'
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#020002',    // Clicado
//                   },
//                   '& .MuiSelect-select': {
//                     color: theme.palette.text.primary, // Cor do texto padrão
//                   },
//                   '&.Mui-focused': {
//                     color: theme.palette.accent.main, // Cor do label ao focar
//                   },
//                 }}
//               >
//                 <MenuItem value="" disabled>
//                   Selecione o tipo de corte
//                 </MenuItem>
//                 {cuts.map((cut) => (
//                   <MenuItem key={cut.id_cuttingType} value={cut}>
//                     {cut.cuttingType}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <Select
//                 value={selectedSize}
//                 onChange={handleSizeChange}
//                 displayEmpty
//                 fullWidth
//                 sx={{ 
//                   mt: 2,
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#020002',  // Default
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#C62828',    // Passar o mouse
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: '#020002',    // Clicado
//                   },
//                   '& .MuiSelect-select': {
//                     color: theme.palette.text.primary, // Cor do texto padrão
//                   },
//                   '&.Mui-focused': {
//                     color: theme.palette.accent.secondary, // Cor do label ao focar
//                   },
//                 }}
//                 disabled={selectedCut === 'Peça Inteira' || selectedCut === 'Moída'}
//               >
//                 <MenuItem value="" disabled>
//                   Selecione o tamanho do corte
//                 </MenuItem>
//                 {sizes.map((size) => (
//                   <MenuItem key={size} value={size}>
//                     {size}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                 <Button
//                   variant="outlined"
//                   onClick={decreaseQuantityByKg}
//                   sx={{ mx: 1 }}
//                 >
//                   <RemoveIcon />
//                   -1kg
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={decreaseQuantity}
//                   sx={{ mx: 1 }}
//                 >
//                   <RemoveIcon />
//                   -100g
//                 </Button>
//                 <Typography variant="h6" sx={{ alignSelf: 'center', mx: 2 }}>
//                   {quantity}g
//                 </Typography>
//                 <Button
//                   variant="outlined"
//                   onClick={increaseQuantity}
//                   sx={{ mx: 1 }}
//                 >
//                   <AddIcon />
//                   +100g
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={increaseQuantityByKg}
//                   sx={{ mx: 1 }}
//                 >
//                   <AddIcon />
//                   +1kg
//                 </Button>
//               </Box>
//               <Box sx={{ textAlign: 'center', mt: 3 }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleAddToCart}
//                 >
//                   Adicionar ao Carrinho
//                 </Button>
//               </Box>
//             </div>
//           </div>
//         )}
//       </Box>
//     </Modal>
//   );
// };

// export default ProductModal;
