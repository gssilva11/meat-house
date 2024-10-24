import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
} from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import myfetch from '../utils/myfetch.js';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [waitingTime, setWaitingTime] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      // Here you'd fetch the order details by its ID
      const response = await myfetch.get(`/order/{ORDER_ID}`);
      setOrder(response);
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    // Update waiting time logic
    if (order) {
      setWaitingTime('25 Minutos'); // Example: dynamic based on order state
    }
  }, [order]);

  if (!order) {
    return <Typography variant="h6">Carregando pedido...</Typography>;
  }

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        {/* Order Header */}
        <Typography variant="h5">Pedido Nº {order.id_order}</Typography>
        <Typography variant="subtitle1">
          Registrado às {new Date(order.datetime_order).toLocaleTimeString()}
        </Typography>
        <Typography variant="subtitle1">Cliente: {order.user.first_name} {order.user.last_name}</Typography>
        <Typography variant="subtitle1">E-mail: {order.user.email}</Typography>
        <Typography variant="subtitle1">Prazo Informado: {waitingTime}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* Order Items */}
        <Box sx={{ my: 3 }}>
          <Typography variant="h6">Itens do Pedido</Typography>
          <Divider sx={{ my: 1 }} />
          {order.orderItems.map((item) => (
            <Typography key={item.id_orderItem}>
              {item.product.name} - {item.description}
            </Typography>
          ))}
        </Box>

        <Typography variant="h6">Total: R$ {order.total.toFixed(2)}</Typography>
      </Box>
    </>
  );
};

export default OrderDetails;
