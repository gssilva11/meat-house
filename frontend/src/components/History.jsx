import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import myfetch from '../utils/myfetch';
import { Box, Typography, List, ListItem, ListItemText, Modal, Divider, IconButton, Button } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const History = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await myfetch.get(`order/user-orders?userId=${id}&status_ne=CART`);
        setOrders(fetchedOrders.sort((a, b) => b.id_order - a.id_order));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleAddToCart = async (item) => {
    try {
      const response = await myfetch.post('orderItem', {
        id_order: item.id_order,
        quantity: item.quantity, // Certifique-se de que este campo está presente e é um número válido
        id_product: item.id_product,
        id_cuttingType: item.id_cuttingType,
        thickness: item.thickness,
      });

      if (response) {
        alert('Item adicionado ao carrinho!');
      } else {
        alert('Erro ao adicionar item ao carrinho');
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const translateThickness = (thickness) => {
    switch (thickness) {
      case 'SMALL':
        return 'Pequeno';
      case 'MEDIUM':
        return 'Médio';
      case 'LARGE':
        return 'Grande';
      default:
        return thickness;
    }
  };

  return (
    <>
      <List>
        {orders.map(order => (
          <ListItem key={order.id_order} onClick={() => handleOpenModal(order)} button>
            <Box sx={{ border: '1px solid #C62828', padding: '10px 30px', width: '300px' }}>
              <ListItemText
                primary={`Pedido #${order.id_order} - Status: ${order.status}`}
                secondary={`Data: ${new Date(order.date_order).toLocaleString()}`}
              />
            </Box>
            <HistoryIcon sx={{ ml: '40px', border: '1px solid #C90000', borderRadius: '5px', fontSize: '35px', color: '#f0f0f0', backgroundColor: '#C90000' }} />
          </ListItem>
        ))}
      </List>

      {selectedOrder && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', height: '450px', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', top: 16, left: 16 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
              Pedido #{selectedOrder.id_order} - Status: {selectedOrder.status}
            </Typography>
            <Typography variant="subtitle1" component="div" sx={{ mb: 2, textAlign: 'center' }}>
              Data: {new Date(selectedOrder.date_order).toLocaleString()}
            </Typography>
            <List>
              {selectedOrder.orderItems.map(item => (
                <React.Fragment key={item.id_orderItem}>
                  <ListItem>
                    <ListItemText
                      primary={`Produto: ${item.product.name} - Quantidade: ${item.quantity}g`}
                      secondary={`Corte: ${item.cuttingType.cuttingType}, Espessura: ${translateThickness(item.thickness)}`}
                    />
                    <Typography variant="body2">
                      Preço Total: R${(item.product.price * item.quantity / 1000).toFixed(2)}
                    </Typography>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, position: 'absolute', bottom: 16, right: 16 }}>
              <Button
                variant="contained"
                onClick={() => handleCloseModal(false)}
                sx={{
                  backgroundColor: '#FFFFFF',
                  color: '#8B0000',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  mr: '10px'
                }}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={() => handleAddToCart(selectedOrder)}>Adicionar ao Carrinho</Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default History;
