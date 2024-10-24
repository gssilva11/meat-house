import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Paper, Modal, Button, Select, MenuItem } from '@mui/material';
import myfetch from '../utils/myfetch.js';
import Navbar from '../components/Navbar.jsx';
import VanillaTilt from 'vanilla-tilt';

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

const OrderTracking = () => {
  const [orders, setOrders] = useState({ awaiting: [], preparing: [], readyForPickup: [], readyForDelivery: [] });
  const [users, setUsers] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Busca os pedidos
    myfetch.get('/order')
      .then((response) => {
        const filteredOrders = {
          awaiting: response.map(order => ({ ...order, total: Number(order.total) })).filter(order => order.status === 'AWAITING'),
          preparing: response.map(order => ({ ...order, total: Number(order.total) })).filter(order => order.status === 'PREPARING'),
          readyForPickup: response.map(order => ({ ...order, total: Number(order.total) })).filter(order => order.status === 'READY' && order.id_address === null),
          readyForDelivery: response.map(order => ({ ...order, total: Number(order.total) })).filter(order => order.status === 'READY' && order.id_address !== null),
        };
        setOrders(filteredOrders);

        // Extraindo ids únicos de usuários dos pedidos
        const userIds = Array.from(new Set(response.map(order => order.id_user)));
        
        // Busca os usuários relacionados aos pedidos
        Promise.all(userIds.map(id => myfetch.get(`/user/${id}`)))
          .then((userResponses) => {
            const userMap = {};
            userResponses.forEach((user) => {
              userMap[user.id_user] = `${user.first_name} ${user.last_name}`;
            });
            setUsers(userMap);
          })
          .catch(() => {
            console.error('Erro ao buscar informações dos usuários.');
          });
      })
      .catch(() => {
        console.error('Erro ao buscar pedidos.');
      });
  }, []);

  const handleOrderClick = (orderId) => {
    // Buscar detalhes de um pedido específico
    myfetch.get(`/order/${orderId}`)
      .then((response) => {
        setSelectedOrder({ ...response, total: Number(response.total) });
        setNewStatus(response.status);
        setOpenModal(true);
      })
      .catch(() => {
        console.error('Erro ao buscar detalhes do pedido.');
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = () => {
    if (selectedOrder) {
      myfetch.put(`/order/${selectedOrder.id_order}`, { status: newStatus })
        .then(() => {
          setOrders((prevOrders) => ({
            ...prevOrders,
            [selectedOrder.status.toLowerCase()]: prevOrders[selectedOrder.status.toLowerCase()].filter(o => o.id_order !== selectedOrder.id_order),
            [newStatus.toLowerCase()]: [...prevOrders[newStatus.toLowerCase()], { ...selectedOrder, status: newStatus }],
          }));
          handleCloseModal();
        })
        .catch(() => {
          console.error('Erro ao atualizar o status do pedido.');
        });
    }
  };

  const renderOrderDetails = (order) => (
    <Box>
      <Typography variant="h6" gutterBottom>Detalhes do Pedido Nº {order.id_order}</Typography>
      <Typography>Cliente: {users[order.id_user] || 'Desconhecido'}</Typography>
      <Typography>Endereço: {order.id_address || 'Não informado'}</Typography>
      <Typography>Valor Total: R$ {order.total.toFixed(2)}</Typography>
      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>Produtos:</Typography>
        {order.orderItems && order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography>
                Produto: {item.product.name} - Quantidade: {item.quantity} - Preço: R$ {Number(item.priceOnTheDay).toFixed(2)} - Tipo de Corte: {item.cuttingType}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>Nenhum produto encontrado.</Typography>
        )}
      </Box>
      <Box mt={3}>
        <Typography variant="subtitle1" gutterBottom>Alterar Status:</Typography>
        <Select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="AWAITING">Novo Pedido</MenuItem>
          <MenuItem value="PREPARING">Em Andamento</MenuItem>
          <MenuItem value="READY">Pronto para Retirada</MenuItem>
          <MenuItem value="DONE">Concluído</MenuItem>
          <MenuItem value="CANCELED">Cancelado</MenuItem>
          <MenuItem value="DECLINE">Recusado</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleStatusChange}
        >
          Atualizar Status
        </Button>
      </Box>
    </Box>
  );

  const renderOrders = (orders) => (
    orders.map((order) => {
      const total = Number(order.total); // Converte para número
      return (
        <Tilt key={order.id_order}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              my: 1,
              backgroundColor: '#B71C1C',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              height: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => handleOrderClick(order.id_order)}
          >
            <Typography variant="h6">Pedido Nº {order.id_order}</Typography>
            <Typography>Total: R$ {isNaN(total) ? '0.00' : total.toFixed(2)}</Typography>
            <Typography>Cliente: {users[order.id_user] || 'Desconhecido'}</Typography>
          </Paper>
        </Tilt>
      );
    })
  );

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
        <Grid container spacing={2}>
          {/* Novos Pedidos */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: '#7F0000',
                p: 2,
                borderRadius: 1,
                boxShadow: 3,
                color: 'white',
                textAlign: 'center',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>NOVOS PEDIDOS</Typography>
              <Box sx={{ mt: 2 }}>
                {renderOrders(orders.awaiting)}
              </Box>
            </Box>
          </Grid>

          {/* Em Andamento */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: '#B71C1C',
                p: 2,
                borderRadius: 1,
                boxShadow: 3,
                color: 'white',
                textAlign: 'center',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>EM ANDAMENTO</Typography>
              <Box sx={{ mt: 2 }}>
                {renderOrders(orders.preparing)}
              </Box>
            </Box>
          </Grid>

          {/* Pronto para Retirada */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: '#E53935',
                p: 2,
                borderRadius: 1,
                boxShadow: 3,
                color: 'white',
                textAlign: 'center',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>PRONTO PARA RETIRADA</Typography>
              <Box sx={{ mt: 2 }}>
                {renderOrders(orders.readyForPickup)}
              </Box>
            </Box>
          </Grid>

          {/* Pronto para Entrega */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                backgroundColor: '#FF5252',
                p: 2,
                borderRadius: 1,
                boxShadow: 3,
                color: 'white',
                textAlign: 'center',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>PRONTO PARA ENTREGA</Typography>
              <Box sx={{ mt: 2 }}>
                {renderOrders(orders.readyForDelivery)}
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Modal para exibir e editar detalhes do pedido */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'white',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: '80vw',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {selectedOrder && renderOrderDetails(selectedOrder)}
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default OrderTracking;
