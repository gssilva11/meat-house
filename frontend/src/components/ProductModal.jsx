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

const thicknessTypes = {
  Pequeno: 'SMALL',
  Médio: 'MEDIUM',
  Grande: 'LARGE'
};

const ProductModal = ({ open, onClose, product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(100);
  const [selectedCut, setSelectedCut] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [cuts, setCuts] = useState([]);
  const [description, setDescription] = useState('');
  const maxChars = 150;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDescriptionChange = (event) => {
    const value = event.target.value.replace(/\n/g, ''); // Remove quebras de linha
    if (value.length <= maxChars) {
      setDescription(value);
    }
  };

  const resetFields = () => {
    setQuantity(100);
    setSelectedCut('');
    setSelectedSize('');
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
    try {
      const selectedProduct = {
        quantity,
        thickness: thicknessTypes[selectedSize],
        description,
        priceOnTheDay: Number((product.price * quantity / 1000).toFixed(2)),
        cuttingType: { connect: { id_cuttingType: selectedCut } },
        product: { connect: { id_product: product.id_product } },
        order: { connect: { id_order: 3 } }, // id test
      };
  
      const success = await myfetch.post('orderItem', selectedProduct);
  
      if (success) {
        notifySuccess('Item adicionado ao carrinho!');
        onAddToCart(selectedProduct);
        resetFields(); // Clear the fields after adding to cart
        return;
      } else {
        notifyError('Erro ao adicionar item ao carrinho');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      notifyError('Erro ao adicionar item ao carrinho');
    }
  };

  useEffect(() => {
    if (!open) {
      resetFields();
    }
  }, [open]);

  const handleCutChange = (event) => {
    setSelectedCut(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
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
                    src={product.imageProduct}
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
                <Select
                  value={selectedSize}
                  onChange={handleSizeChange}
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
                    Selecione o tamanho
                  </MenuItem>
                  {Object.keys(thicknessTypes).map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
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

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <IconButton
                      onClick={decreaseQuantity}
                      size="small"
                      sx={{
                        padding: '2px 5px',
                        border: '1px solid red',
                        marginRight: '15px',
                        borderRadius: '5px',
                        mb: '10px',
                        '&:hover': {
                          backgroundColor: 'inherit',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#C62828' }}>-100g</Typography>
                    </IconButton>
                    <IconButton
                      onClick={decreaseQuantityByKg}
                      size="large"
                      sx={{
                        padding: '2px 5px',
                        backgroundColor: 'red',
                        borderRadius: '5px',
                        mb: '10px',
                        border: '1px solid red',
                        '&:hover': {
                          backgroundColor: 'red',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#f0f0f0' }}>-1Kg</Typography>
                    </IconButton>
                  </Box>
                  <Typography variant="h6" component="p" sx={{ mx: 2, margin: '0 40px 0 40px' }}>
                    {quantity}g
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={increaseQuantity}
                      size="small"
                      sx={{
                        padding: '2px 5px',
                        marginRight: '15px',
                        border: '1px solid green',
                        borderRadius: '5px',
                        mb: '10px',
                        '&:hover': {
                          backgroundColor: 'inherit',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: 'green' }}>+100g</Typography>
                    </IconButton>
                    <IconButton
                      onClick={increaseQuantityByKg}
                      size="large"
                      sx={{
                        padding: '2px 5px',
                        backgroundColor: 'green',
                        borderRadius: '5px',
                        mb: '10px',
                        border: '1px solid green',
                        '&:hover': {
                          backgroundColor: 'green',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#f0f0f0' }}>+1Kg</Typography>
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', mt: 2, width: isMobile ? '100%' : 'auto' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddToCart}
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
