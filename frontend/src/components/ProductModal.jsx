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
  Tooltip,
  TextField,
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
  const [selectedCut, setSelectedCut] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [cuts, setCuts] = useState([]);
  const [observations, setObservations] = useState('');
  const maxChars = 150;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        id_product: product.id_product,
        id_cuttingType: selectedCut.id_cuttingType,
        thickness: thicknessTypes[selectedSize],
        // ID DEFINIDO COMO 10 PARA TESTES
        id_customer: 10
      };

      const success = await myfetch.post('orderItem', selectedProduct);

      if (success) {
        notifySuccess('Item adicionado ao carrinho!');
        onAddToCart(selectedProduct);
        return;
      } else {
        notifyError('Erro ao adicionar item ao carrinho');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      notifyError('Erro ao adicionar item ao carrinho');
    }
  };

  const handleCutChange = (event) => {
    const selectedCutId = event.target.value;
    const selectedCutObject = cuts.find(cut => cut.id_cuttingType === selectedCutId);
    setSelectedCut(selectedCutObject);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleObservationsChange = (event) => {
    if (event.target.value.length <= maxChars) {
      setObservations(event.target.value);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 100);
  const decreaseQuantity = () => setQuantity(prev => prev - 100 > 0 ? prev - 100 : 0);
  const increaseQuantityByKg = () => setQuantity(prev => prev + 1000);
  const decreaseQuantityByKg = () => setQuantity(prev => prev - 1000 > 0 ? prev - 1000 : 0);

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '80%' : 1050,
            height: isMobile ? 'auto' : 530,
            //Talvez votar para #F0F0F0
            background: 'linear-gradient(90deg, #000 51%, rgba(240,240,240,1) 52%)',
            border: `2px solid #C62828`,
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
          }}
        >
          {product && (
            <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
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
                      border: '2px solid #000',
                    }}
                  />
                  <Typography sx={{ fontSize: '0.8rem', position:'absolute', color:'#f0f0f0', alignSelf:'flex-end', mb:'25px', width:'480px'}}>
                  <InfoIcon fontSize="small" sx={{ color: '#f0f0f0', marginRight:'10px', position:'absolute' }} />
                  ㅤㅤO peso do produto pode ter uma variação de aproximadamente 100 gramas. Isso pode ㅤㅤafetar o valor final da compra.
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: 'transparent', mr: '13px', height: '480px', alignSelf: 'center' }} />
                </>
              )}
              <div style={{ flexGrow: 1, width: '50%' }}>
                <IconButton
                  onClick={onClose}
                  sx={{
                    color: '#C62828',
                    position: 'absolute',
                    top: 16,
                    left: 16
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Typography id="modal-title" variant="h4" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {product.name}
                  {/* <Typography>
                    <Tooltip
                      title={
                        <Typography sx={{ fontSize: '1rem' }}>
                          O peso do produto pode ter uma variação de aproximadamente 100 gramas. Isso pode afetar o valor final da compra.
                        </Typography>
                      }
                      sx={{
                        '& .MuiTooltip-tooltip': {
                          padding: '4px 8px',
                          fontSize: '0.875rem',
                        },
                      }}
                    >
                      <InfoIcon fontSize="medium" sx={{ color: '#272727' }} />
                    </Tooltip>
                  </Typography> */}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                  Preço por kg: R${product.price}
                </Typography>
                <Typography variant="h5" component="p" sx={{ mt: 1, fontWeight: 'bold' }}>
                  Total: R${(product.price * quantity / 1000).toFixed(2)}
                </Typography>
                <Select
                  value={selectedCut ? selectedCut.id_cuttingType : ''}
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
                <Box position="relative" width="450px">
                  <TextField
                    multiline
                    placeholder="Observações:"
                    value={observations}
                    onChange={handleObservationsChange}
                    InputProps={{
                      style: {
                        color: '#272727',
                        marginTop: '3px',
                        marginLeft: '4px',
                      },
                    }}
                    sx={{
                      width: '460px',
                      fontSize: '18px',
                      lineHeight: '1rem',
                      padding: '2px', // Remover padding
                      borderRadius: '4px 4px 0 4px',
                      border: '0.1rem solid #272727',
                      mt: 2,
                      height: '85px',
                      '& .MuiOutlinedInput-root': {
                        padding: '0px', // Remover padding interno
                        '& fieldset': {
                          borderColor: 'transparent', // Remover a borda interna
                        },
                        '&:hover fieldset': {
                          borderColor: 'transparent', // Remover a borda interna ao passar o mouse
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'transparent', // Remover a borda interna ao focar
                        },
                        '& textarea': {
                          color: '#272727',
                          marginTop: '3px',
                          marginLeft: '4px',
                          padding: '0px', // Remover padding interno do textarea
                        },
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    position="absolute"
                    bottom="0px"
                    right="-5px"
                  >
                    {observations.length}/{maxChars}
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <IconButton
                      onClick={decreaseQuantityByKg}
                      size="large"
                      sx={{
                        padding: '2px 5px 2px 5px',
                        marginRight: '15px',
                        backgroundColor: 'red',
                        borderRadius: '5px',
                        border: '1px solid red',
                        '&:hover': {
                          backgroundColor: 'red',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#f0f0f0' }}>-1Kg</Typography>
                    </IconButton>
                    <IconButton
                      onClick={decreaseQuantity}
                      size="small"
                      sx={{
                        padding: '2px 5px 2px 5px',
                        border: '1px solid red',
                        borderRadius: '5px',
                        '&:hover': {
                          backgroundColor: 'inherit',
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ color: '#C62828' }}>-100g</Typography>
                    </IconButton>
                  </Box>
                  <Typography variant="h6" component="p" sx={{ mx: 2, margin: '0 40px 0 40px' }}>
                    {quantity} g
                  </Typography>
                  <Box>
                    <IconButton
                      onClick={increaseQuantity}
                      size="small"
                      sx={{
                        padding: '2px 5px 2px 5px',
                        marginRight: '15px',
                        border: '1px solid green',
                        borderRadius: '5px',
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
                        padding: '2px 5px 2px 5px',
                        backgroundColor: 'green',
                        borderRadius: '5px',
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
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: '10px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, justifyContent: 'flex-end' }}
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

