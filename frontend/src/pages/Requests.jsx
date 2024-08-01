import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import Navbar from '../components/Navbar';

const Requests = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simular recebimento de pedidos
    const receivedOrders = localStorage.getItem('orders');
    if (receivedOrders) {
      setOrders(JSON.parse(receivedOrders));
    }
  }, []);

  const acceptOrder = (index) => {
    alert('Pedido aceito!');
    console.log('Pedido:', orders[index]);
  };

  const rejectOrder = (index) => {
    alert('Pedido recusado!');
    // Apenas remova o pedido da lista
    setOrders(orders.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar></Navbar>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{color: '#f0f0f0'}}>Pedidos Recebidos</Typography>
        {orders.map((order, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <List>
              {order.map((item, i) => (
                <ListItem key={i}>
                  <ListItemText primary={item.name} secondary={`Quantidade: ${item.quantity}`} />
                </ListItem>
              ))}
            </List>
            <Button variant="contained" color="primary" onClick={() => acceptOrder(index)}>
              Aceitar Pedido
            </Button>
            <Button variant="contained" color="secondary" onClick={() => rejectOrder(index)}>
              Recusar Pedido
            </Button>
          </Paper>
        ))}
      </Box>
    </>
  );
};

export default Requests;
