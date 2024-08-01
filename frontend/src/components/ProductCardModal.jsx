import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Card,
  CardContent
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VanillaTilt from 'vanilla-tilt';
import { notifySuccess } from './Notification';

const getImagePath = (imageProduct) => `${imageProduct}`;

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

const ProductCardModal = ({ open, onClose, searchResults = [], onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setProductModalOpen(false);
  };

  const addToCart = (product) => {
    onAddToCart(product);
    notifySuccess('Item adicionado ao carrinho!');
    handleCloseProductModal();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'yellow',
          border: '1px solid orange',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
          maxHeight: '80vh',
        }}
      >
        <Typography id="modal-title" variant="h4" component="h2" gutterBottom>
          Resultados da Pesquisa
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
          {searchResults.map((product) => (
            <Tilt key={product.id}>
              <Card
                sx={{
                  width: '200px',
                  height: '275px',
                  backgroundColor: '#010203',
                  border: '1px solid #33363d',
                  boxShadow: '1px 2px 3.5px #121212',
                }}
              >
                <div style={{ position: 'relative', padding: '16px' }}>
                  <Typography variant="h6" sx={{ color: '#f0f0f0' }}>{product.name}</Typography>
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
                      <Typography sx={{ color: '#f0f0f0' }} variant="h6">
                        R${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        color="warning"
                        aria-label="Adicionar ao carrinho"
                        sx={{ fontWeight: 600 }}
                        onClick={() => handleOpenProductModal(product)}
                      >
                        <ShoppingCartIcon />
                      </Button>
                    </Box>
                  </div>
                </CardContent>
              </Card>
            </Tilt>
          ))}
        </div>
        {selectedProduct && (
          <productModalOpen
            open={productModalOpen}
            onClose={handleCloseProductModal}
            product={selectedProduct}
            onAddToCart={addToCart}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ProductCardModal;
