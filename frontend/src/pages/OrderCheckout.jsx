import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  FormControl,
  Grid,
  Paper,
} from '@mui/material';
import { notifySuccess, notifyError } from '../components/Notification.jsx';
import myfetch from '../utils/myfetch.js';
import Navbar from '../components/Navbar.jsx';

const OrderCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [pickupOption, setPickupOption] = useState('local');
  const [waitingTime, setWaitingTime] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);

    // Buscar os endereços do usuário autenticado
    if (storedUser) {
      myfetch.get(`/address/user/${storedUser.id}`)
        .then(response => {
          setAddresses(response);
          console.log('Endereços recebidos:', JSON.stringify(response, null, 2));
        })
        .catch(() => notifyError('Erro ao buscar endereços'));
    }
  }, []);

  useEffect(() => {
    if (pickupOption === 'local') {
      setWaitingTime('40 minutos');
    } else {
      setWaitingTime('1h até 1h30');
    }
  }, [pickupOption]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.priceOnTheDay * (item.quantity / 1000),
      0
    ).toFixed(2);
  };

  const handleFinishOrder = async () => {
    if (!user && pickupOption !== 'local') {
      notifyError('Usuário não autenticado.');
      return;
    }
    if (!selectedAddress && pickupOption === 'delivery') {
      notifyError('Selecione um endereço para entrega.');
      return;
    }

    try {
      const total = calculateTotal();
      const orderData = {
        // Se a opção for "local", usar ID de usuário 0
        id_user: user.id,
        id_address: pickupOption === 'delivery' ? selectedAddress : null,
        status: 'AWAITING',
        total: parseFloat(total),
        orderItems: cartItems.map(item => ({
          id_product: item.product.connect.id_product,
          cuttingType: item.cuttingType.connect.id_cuttingType,
          quantity: item.quantity,
          priceOnTheDay: parseFloat(item.priceOnTheDay),
          description: item.description || '-',
        })),
      };

      // Criar a ordem no backend
      const createdOrder = await myfetch.post('/order', orderData);
      if (!createdOrder) {
        notifyError('Erro ao criar o pedido.');
        return;
      }

      notifySuccess('Compra finalizada com sucesso!');
      localStorage.removeItem('cart');
      window.location.href = '/';
    } catch (error) {
      notifyError('Erro ao finalizar a compra');
    }
  };

  if (cartItems.length === 0) {
    return <Typography variant="h6" align="center">Seu carrinho está vazio.</Typography>;
  }

  const getBackgroundColor = (status, type) => {
    if (status === 'READY') {
      return type === 'delivery' ? '#FFD700' : '#FF6347'; // Amarelo para entrega, vermelho para retirada
    }
    return '#FFFFFF'; // Cor padrão (branca)
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
        {/* Revisão do Pedido */}
        <Box sx={{ mb: 3, backgroundColor: '#f9f9f9', borderRadius: 2, p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Revisão do Pedido</Typography>
          <Divider sx={{ my: 2 }} />
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography>
                <strong>{item.product.name}</strong> - {item.quantity / 1000}Kg - R$
                {(item.priceOnTheDay * (item.quantity / 1000)).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
            Total: R${calculateTotal()}
          </Typography>
        </Box>

        {/* Entrega */}
        <Box sx={{ mb: 3, backgroundColor: '#f9f9f9', borderRadius: 2, p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Entrega</Typography>
          <Divider sx={{ my: 2 }} />

          <FormControl component="fieldset">
            <RadioGroup
              row
              value={pickupOption}
              onChange={(e) => setPickupOption(e.target.value)}
            >
              <FormControlLabel
                value="local"
                control={<Radio />}
                label="Retirada no Local"
              />
              <FormControlLabel
                value="delivery"
                control={<Radio />}
                label="Entrega"
              />
            </RadioGroup>
          </FormControl>

          {pickupOption === 'delivery' && addresses.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Escolha o Endereço:</Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {addresses.map((address) => (
                  <Grid item xs={12} sm={6} md={4} key={address.id_address}>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        backgroundColor: selectedAddress === address.id_address ? '#e0f7fa' : '#ffffff',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedAddress(address.id_address)}
                    >
                      <FormControlLabel
                        control={
                          <Radio
                            checked={selectedAddress === address.id_address}
                            onChange={() => setSelectedAddress(address.id_address)}
                          />
                        }
                        label={`${address.street_name}, ${address.house_number} - ${address.neighborhood} - ${address.city}, ${address.state}`}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {addresses.length === 0 && (
            <Typography variant="body1" color="error">
              Nenhum endereço cadastrado.
            </Typography>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Tempo de espera: {waitingTime}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleFinishOrder}
          fullWidth
          sx={{ padding: 2, fontSize: '1.2rem' }}
        >
          Finalizar Compra
        </Button>
      </Box>
    </>
  );
};

export default OrderCheckout;
