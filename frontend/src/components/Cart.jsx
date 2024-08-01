import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import myfetch from '../utils/myfetch';

const Cart = ({ open, onClose }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await myfetch.get('orderItem');
        
        // Fetch product names for each order item
        const itemsWithProductNames = await Promise.all(
          data.map(async item => {
            const product = await myfetch.get(`product/${item.id_product}`);
            return { ...item, productName: product.name };
          })
        );

        setItems(itemsWithProductNames);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await myfetch.delete(`orderItem/${id}`);
      setItems(items.filter(item => item.id_orderItem !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          maxWidth: '90%',
          height: 420,
          maxHeight: '90%',
          bgcolor: 'background.paper',
          border: '2px solid #C62828',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={onClose}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
            Carrinho
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: 230,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
              backgroundColor: '#f0f0f0', // Cor do fundo da barra de rolagem
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888', // Cor do indicador de rolagem
              borderRadius: '4px',
            },
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <List>
              {items.map(item => (
                <Box
                  key={item.id_orderItem}
                  sx={{
                    bgcolor: 'background.paper',
                    border: '1px solid transparent',
                    borderRadius: '3px',
                    boxShadow: 2,
                    margin:'0px 25px 5px 25px',
                  }}
                >
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleDelete(item.id_orderItem)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${item.productName} - ${item.quantity}`} />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Continuar comprando
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/fc"
          >
            Prosseguir com pedido
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Cart;
