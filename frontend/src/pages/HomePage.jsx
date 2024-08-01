import React, { useState, useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { Card, CardContent, Typography, Button, Box, Modal, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Buttons from '../components/Buttons';
import ProductModal from '../components/ProductModal';
import myfetch from '../utils/myfetch';
import detalheIcon from '../assets/logo/tituloDetalhe.png';
import InfoIcon from '@mui/icons-material/Info';
import { Textfit } from 'react-textfit';

const getImagePath = (imageProduct) => {
  return `${imageProduct}`;
};

const Tilt = ({ children }) => {
  const tiltRef = useRef();

  useEffect(() => {
    const tiltNode = tiltRef.current;
    VanillaTilt.init(tiltNode, {
      max: 2.5,
      speed: 500,
      glare: true,
      'max-glare': 0.1,
    });

    return () => {
      tiltNode.vanillaTilt.destroy();
    };
  }, []);

  return (
    <div ref={tiltRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await myfetch.get('product');
        const availableProducts = data.filter(product => product.availability);
        setProducts(availableProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleExpandCategory = (category) => {
    setExpandedCategory(category === expandedCategory ? null : category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setOpen(false);
  };

  const updateItem = (index) => {
    setSelectedProductIndex(index);
    setProductModalOpen(true);
  };

  const removeItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const proceedToCheckout = () => {
    const cartData = JSON.stringify(cartItems);
    console.log(cartData);
    localStorage.setItem('orders', cartData); // Simular envio de pedidos
    setCartOpen(false);
    window.location.href = '/requests'; // Redirecionar para a página de Requests
  };

  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedProducts).sort();

  return (
    <>
      <Navbar cartItems={cartItems} setCartOpen={setCartOpen} />
      <Banner />
      <Buttons />
      <div style={{ margin: '2% 10% 5% 10%' }}>
        <Buttons onExpandCategory={handleExpandCategory} />
        {sortedCategories.map((category) => (
          (expandedCategory === null || expandedCategory === category) && (
            <React.Fragment key={category}>
              <div style={{ marginBottom: '40px', textAlign: 'left' }}>
                {expandedCategory === category && (
                  <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setExpandedCategory(null)}
                    sx={{
                      color: '#f0f0f0',
                      marginBottom: '16px',
                      textDecoration: 'underline',
                      backgroundColor: '#0f0f0f',
                    }}
                  >
                    Voltar
                  </Button>
                )}
                <Typography
                  variant="h4"
                  sx={{
                    color: '#f0f0f0',
                    marginBottom: '16px',
                    textAlign: expandedCategory ? 'left' : 'center',
                    marginTop: expandedCategory ? '0' : '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={detalheIcon} alt="detalhe" style={{ marginRight: '15px', height: '25px' }} />
                  {category}
                  <img src={detalheIcon} alt="detalhe" style={{ marginLeft: '15px', height: '25px' }} />
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
                  {(expandedCategory === category ? groupedProducts[category] : groupedProducts[category].slice(0, 4)).map(product => (
                    <Tilt key={product.id}>
                      <Card
                        sx={{
                          width: '200px', // Reduzindo o tamanho do card em 20%
                          height: '275px',
                          backgroundColor: '#010203',
                          border: '1px solid #33363d',
                          boxShadow: '1px 2px 3.5px #121212',
                        }}
                      >
                        <div style={{ position: 'relative', padding: '16px' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              color: '#f0f0f0'
                            }}
                          >
                            <Textfit
                              mode="single"
                              max={20} // Tamanho máximo da fonte
                              style={{ flexGrow: 1 }}
                            >
                              {product.name}
                            </Textfit>
                            <Tooltip
                              title={
                                <Typography sx={{ fontSize: '1rem' }}>
                                  Imagem meramente ilustrativa.
                                </Typography>
                              }
                              sx={{
                                '& .MuiTooltip-tooltip': {
                                  padding: '4px 8px',
                                  fontSize: '0.875rem',
                                  backgroundColor: '#333',
                                },
                              }}
                            >
                              <InfoIcon fontSize="medium" sx={{ color: '#f0f0f0' }} />
                            </Tooltip>
                          </Box>
                        </div>
                        <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <img
                            src={getImagePath(product.imageProduct)}
                            alt={product.name}
                            loading="lazy"
                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '11px 0 11px 0' }}
                          />
                        </div>
                        <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            <Typography sx={{ color: '#f0f0f0' }} variant="body2">Preço (Kg):</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography sx={{ color: '#f0f0f0' }} variant="h6" >
                                R${product.price}
                              </Typography>
                              <Button
                                variant="contained"
                                color="warning"
                                aria-label="Adicionar ao carrinho"
                                sx={{ fontWeight: 600 }}
                                onClick={() => handleOpen(product)}
                              >
                                <ShoppingCartIcon />
                              </Button>
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </Tilt>
                  ))}
                  {expandedCategory !== category && (
                    <Tilt>
                      <Card
                        sx={{
                          width: '200px', // Reduzindo o tamanho do card em 20%
                          height: '275px',
                          backgroundColor: '#010203',
                          border: '1px dotted #33363d',
                          boxShadow: '1px 2px 3.5px #121212',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleExpandCategory(category)}
                      >
                        <Typography variant="h6" sx={{ color: '#f0f0f0', textDecoration: 'underline' }}>Ver mais produtos!</Typography>
                      </Card>
                    </Tilt>
                  )}
                </div>
              </div>
              <div style={{ padding: '15px' }}></div>
            </React.Fragment>
          )
        ))}
        {selectedProduct && (
          <ProductModal
            open={open}
            onClose={handleClose}
            product={selectedProduct}
            onAddToCart={addToCart}
          />
        )}
        {/* <Modal open={cartOpen} onClose={() => setCartOpen(false)}>
          <Box sx={{ width: '80%', margin: 'auto', marginTop: '50px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', maxHeight: '80vh', overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom>Carrinho de Compras</Typography>
            {cartItems.length === 0 ? (
              <Typography variant="body1">Seu carrinho está vazio.</Typography>
            ) : (
              <List>
                {cartItems.map((item, index) => (
                  <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ListItemText primary={item.name} secondary={`Preço: R$${item.price}`} />
                    <div>
                      <IconButton onClick={() => updateItem(index)}><EditIcon /></IconButton>
                      <IconButton onClick={() => removeItem(index)}><DeleteIcon /></IconButton>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <Button variant="contained" onClick={() => setCartOpen(false)}>Continuar Comprando</Button>
              <Button variant="contained" color="primary" onClick={proceedToCheckout} disabled={cartItems.length === 0}>Prosseguir para o Checkout</Button>
            </Box>
          </Box>
        </Modal> */}
        {selectedProductIndex !== null && (
          <ProductModal
            open={productModalOpen}
            onClose={() => setProductModalOpen(false)}
            product={cartItems[selectedProductIndex]}
            onAddToCart={(updatedProduct) => {
              const updatedCart = [...cartItems];
              updatedCart[selectedProductIndex] = updatedProduct;
              setCartItems(updatedCart);
              setProductModalOpen(false);
              setSelectedProductIndex(null);
            }}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
