import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  IconButton,
  useMediaQuery,
  useTheme,
  TextareaAutosize,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoIcon from '@mui/icons-material/Info';
import myfetch from '../utils/myfetch';
import Notification, { notifySuccess, notifyError } from './Notification';

const ProductModal = ({ open, onClose, product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(100);
  const [selectedCut, setSelectedCut] = useState('');
  const [cuts, setCuts] = useState([]);
  const [description, setDescription] = useState('');
  const maxChars = 150;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDescriptionChange = (event) => {
    const value = event.target.value.replace(/\n/g, ''); // Remove quebras de linha
    if (value.length <= maxChars) {
      setDescription(value);
    }
  };

  const resetFields = () => {
    setQuantity(100);
    setSelectedCut('');
    setDescription('');
  };

  useEffect(() => {
    if (product && open) {
      const fetchData = async () => {
        try {
          const cutsData = await myfetch.get('cuttingType');
          setCuts(cutsData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [product, open]);

  const handleAddToCart = async () => {
    if (!selectedCut) {
      notifyError('Por favor, selecione o tipo de corte');
      return; // Bloqueia o processo se o tipo de corte não for selecionado
    }

    try {
      const selectedCuttingType = cuts.find(cut => cut.id_cuttingType === selectedCut);
      const selectedProduct = {
        quantity,
        description,
        priceOnTheDay: product.price,
        cuttingType: { 
          connect: { id_cuttingType: selectedCut },
          name: selectedCuttingType ? selectedCuttingType.cuttingType : ''
        },
        product: { 
          connect: { id_product: product.id_product },
          name: product.name
        },
      };
  
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = existingCart.findIndex(
        (item) => item.product.connect.id_product === product.id_product
      );
  
      if (existingProductIndex !== -1) {
        // Atualiza o produto existente no carrinho
        existingCart[existingProductIndex] = selectedProduct;
        notifySuccess('Item atualizado no carrinho!');
      } else {
        // Adiciona um novo produto ao carrinho
        existingCart.push(selectedProduct);
        notifySuccess('Item adicionado ao carrinho!');
      }
  
      localStorage.setItem('cart', JSON.stringify(existingCart));
      onAddToCart(selectedProduct);
      resetFields();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      notifyError('Erro ao adicionar item ao carrinho');
    }
  };

  useEffect(() => {
    if (!open) {
      resetFields();
    } else {
      // Verifica se o produto já existe no localStorage e preenche os campos
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = existingCart.find(
        (item) => item.product.connect.id_product === product.id_product
      );

      if (existingProduct) {
        setQuantity(existingProduct.quantity);
        setSelectedCut(existingProduct.cuttingType.connect.id_cuttingType);
        setDescription(existingProduct.description);
      }
    }
  }, [open, product]);

  const handleCutChange = (event) => {
    setSelectedCut(event.target.value);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 100);
  const increaseQuantityByKg = () => setQuantity(prev => prev + 1000);
  const decreaseQuantity = () => setQuantity(prev => (prev - 100 >= 100 ? prev - 100 : 100));
  const decreaseQuantityByKg = () => setQuantity(prev => (prev - 1000 >= 100 ? prev - 1000 : 100));

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '80%' : '1050px',
            height: isMobile ? 'auto' : 530,
            background: isMobile ? '#f0f0f0' : 'linear-gradient(90deg, #e4e4e4 51%, rgba(240,240,240,1) 52%)',
            border: `2px solid #C62828`,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          {product && (
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
              {!isMobile && (
                <>
                  <img
                    src={`src/assets/products/${product.imageProduct}`}
                    alt={product.name}
                    style={{
                      width: '50%',
                      height: 'auto',
                      objectFit: 'contain',
                      marginRight: '16px',
                      border: '3px solid #000',
                    }}
                  />
                  <Typography sx={{ fontSize: '0.8rem', position: 'absolute', color: '#272727', alignSelf: 'flex-end', mb: '25px', width: '480px' }}>
                    <InfoIcon fontSize="small" sx={{ color: '#272727', marginRight: '10px', position: 'absolute' }} />
                    ㅤㅤO peso do produto pode ter uma variação de aproximadamente 100 gramas. Isso pode ㅤㅤafetar o valor final da compra.
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: 'transparent', mr: '13px', height: '480px', alignSelf: 'center' }} />
                </>
              )}
              <div style={{ flexGrow: 1, width: '100%' }}>
                <IconButton
                  onClick={onClose}
                  sx={{
                    color: '#C62828',
                    position: 'absolute',
                    top: isMobile ? 5 : 16,
                    left: isMobile ? 5 : 16
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography id="modal-title" variant="h4" component="h2" sx={{ display: 'flex', justifyContent: 'center' }}>
                  {product.name}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Preço por kg: R${product.price}
                </Typography>
                <Typography variant="h5" component="p" sx={{ mt: 1, fontWeight: 'bold' }}>
                  Total: R${(product.price * quantity / 1000).toFixed(2)}
                </Typography>
                <Select
                  value={selectedCut}
                  onChange={handleCutChange}
                  displayEmpty
                  fullWidth
                  sx={{
                    mt: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#020002',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#C62828',
                      cursor: 'pointer'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#020002',
                    },
                    '& .MuiSelect-select': {
                      color: theme.palette.text.primary,
                    },
                    '&.Mui-focused': {
                      color: theme.palette.accent.main,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Selecione o tipo de corte
                  </MenuItem>
                  {cuts.map((cut) => (
                    <MenuItem key={cut.id_cuttingType} value={cut.id_cuttingType}>
                      {cut.cuttingType}
                    </MenuItem>
                  ))}
                </Select>

                <Box position="relative" width="100%" mt={2}>
                  <TextareaAutosize
                    aria-label="Observações"
                    placeholder="Observações:"
                    value={description}
                    onChange={handleDescriptionChange}
                    maxLength={maxChars}
                    style={{
                      fontFamily: '"Sean Slab", serif',
                      backgroundColor: '#f0f0f0',
                      width: '100%',
                      height: '50px',
                      borderColor: '#020002',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderRadius: '4px',
                      padding: '8px',
                      boxSizing: 'border-box',
                      resize: 'none',
                      color: '#272727',
                      overflowY: 'auto',
                      background: '#f0f0f0',
                      scrollbarWidth: 'thin', // For Firefox
                      scrollbarColor: '#f0f0f0 transparent' // For Firefox
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      color: '#272727'
                    }}
                  >
                    {description.length}/{maxChars}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent='space-between' mt={2}>

                  <Box>
                    <Button onClick={decreaseQuantity} variant="outlined" sx={{ color: '#C62828', borderColor: '#C62828', justifyContent: 'start', marginRight:'15px'}}>
                      -100g
                    </Button>
                    <Button onClick={decreaseQuantityByKg} variant="outlined" sx={{ color: '#f0f0f0', borderColor: '#C62828', backgroundColor: '#C62828' }}>
                      -1kg
                    </Button>
                  </Box>

                  <Typography>{quantity}g</Typography>

                  <Box>
                    <Button onClick={increaseQuantity} variant="outlined" sx={{ color: 'green', borderColor: 'green',  marginRight:'15px' }}>
                      +100g
                    </Button>
                    <Button onClick={increaseQuantityByKg} variant="outlined" sx={{ color: '#f0f0f0', borderColor: 'green', backgroundColor: 'green' }}>
                      +1kg
                    </Button>
                  </Box>

                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end'
                  }}>
                  <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    sx={{
                      mt: 3,
                      backgroundColor: '#C62828',
                      '&:hover': { backgroundColor: '#C62828' },
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </Box>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      <Notification />
    </>
  );
};

export default ProductModal;
