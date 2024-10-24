import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductModal from './ProductModal';
import Notification, { notifySuccess, notifyError } from './Notification';
import LoadingSpinner from './LoadingSpinner'; // Importe o LoadingSpinner
import { useNavigate } from 'react-router-dom';

const CartModal = ({ open, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de loading
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const loadCartItems = () => {
    // Simula o carregamento do carrinho
    setLoading(true); // Inicia o loading

    setTimeout(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
      setLoading(false); // Para o loading depois que os itens são carregados
    }, 500); // Simula um atraso de 1.5 segundos para testar o spinner
  };

  useEffect(() => {
    if (open) {
      loadCartItems();
    }
  }, [open]);

  const handleRemoveItem = (id_product) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.connect.id_product !== id_product
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    notifySuccess('Item removido do carrinho!');
  };

  const handleEditItem = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleUpdateCart = (updatedProduct) => {
    const updatedCart = cartItems.map((item) =>
      item.product.connect.id_product === updatedProduct.product.connect.id_product
        ? updatedProduct
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    notifySuccess('Item atualizado no carrinho!');
    setIsProductModalOpen(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceOnTheDay * (item.quantity / 1000),
      0
    ).toFixed(2);
  };

  const handleCloseCart = () => {
    onClose();
    window.location.reload(); // Recarrega a página quando o modal é fechado
  };

  const handleUserClick = () => {
    navigate(`/checkout`);
  };

  if (loading) {
    // Exibe o spinner enquanto os itens estão sendo carregados
    return <LoadingSpinner message="Carregando carrinho..." />;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseCart} // Altera o fechamento para recarregar a página
        aria-labelledby="cart-modal-title"
        aria-describedby="cart-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : '600px',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            border: '2px solid #C62828',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', 
            height: '90vh', 
          }}
        >
          <Typography id="cart-modal-title" variant="h4" component="h2" align="center">
            <ShoppingCartIcon /> Carrinho de Compras
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              maxHeight: '60vh',
            }}
          >
            <List>
              {cartItems.length === 0 && (
                <Typography variant="body1" align="center">
                  Seu carrinho está vazio.
                </Typography>
              )}
              {cartItems.map((item, index) => (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      mb: 1,
                      p: 1.5
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="h6">
                          {item.product.name}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Tipo do Corte: {item.cuttingType.name}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Quantidade: {item.quantity / 1000}Kg ({item.quantity}g)
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2" color="text.primary">
                            Preço: R${(item.priceOnTheDay * (item.quantity / 1000)).toFixed(2)}
                          </Typography>
                          {item.description && (
                            <>
                              <br />
                              <Typography component="span" variant="body2" color="text.primary">
                                Descrição: {item.description}
                              </Typography>
                            </>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditItem(item)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleRemoveItem(item.product.connect.id_product)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < cartItems.length - 1}
                </div>
              ))}
            </List>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Total: R${calculateTotal()}</Typography>
            <Button 
        variant="contained" 
        color={cartItems.length === 0 ? "grey" : "primary"}
        disabled={cartItems.length === 0}
        onClick={handleUserClick}
      >
        Finalizar Compra
      </Button>

          </Box>
        </Box>
      </Modal>

      {selectedProduct && (
        <ProductModal
          open={isProductModalOpen}
          onClose={() => setIsProductModalOpen(false)}
          product={selectedProduct}
          onAddToCart={handleUpdateCart}
        />
      )}

      <Notification />
    </>
  );
};

export default CartModal;
