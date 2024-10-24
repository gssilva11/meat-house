import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import myfetch from '../utils/myfetch';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

const History = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await myfetch.get(`order/user-orders?userId=${id}&status_ne=CART`);
        setOrders(fetchedOrders.sort((a, b) => new Date(b.datetime_order) - new Date(a.datetime_order)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  const translateStatus = (status) => {
    switch (status) {
      case 'AWAITING': return 'Aguardando';
      case 'PREPARING': return 'Preparando';
      case 'READY': return 'Pronto';
      case 'DONE': return 'Finalizado';
      case 'DECLINE': return 'Recusado';
      case 'CANCELED': return 'Cancelado';
      default: return status;
    }
  };

  const handleOrderClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const ordersInProgress = orders.filter(order => ['AWAITING', 'PREPARING', 'READY'].includes(order.status));
  const completedOrders = orders.filter(order => !['AWAITING', 'PREPARING', 'READY', 'CART'].includes(order.status));

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Pedidos em Andamento</Typography>
      {ordersInProgress.length === 0 ? (
        <Typography>Nenhum pedido em andamento.</Typography>
      ) : (
        <List>
          {ordersInProgress.map(order => (
            <ListItem key={order.id_order} button onClick={() => handleOrderClick(order.id_order)}>
              <ListItemText
                primary={`Pedido #${order.id_order}`}
                secondary={`Data: ${new Date(order.datetime_order).toLocaleString()} | Valor: R$${order.total.toFixed(2)} | Status: ${translateStatus(order.status)}`}
              />
              <HistoryIcon />
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Histórico de Pedidos</Typography>
      {completedOrders.length === 0 ? (
        <Typography>Nenhum pedido finalizado.</Typography>
      ) : (
        <List>
          {completedOrders.map(order => (
            <ListItem key={order.id_order} button onClick={() => handleOrderClick(order.id_order)}>
              <ListItemText
                primary={`Pedido #${order.id_order}`}
                secondary={`Data: ${new Date(order.datetime_order).toLocaleString()} | Valor: R$${order.total.toFixed(2)} | Status: ${translateStatus(order.status)}`}
              />
              <HistoryIcon />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default History;
