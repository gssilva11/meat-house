import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
} from '@mui/material';
import { notifySuccess, notifyError } from '../components/Notification.jsx';
import MyFetch from '../utils/myfetch.js';
import Navbar from '../components/Navbar.jsx'

const OrderCheckout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [pickupOption, setPickupOption] = useState('local');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [waitingTime, setWaitingTime] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);
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
    if (!user) {
      notifyError('Usuário não autenticado.');
      return;
    }
    if (!selectedAddress && pickupOption === 'delivery') {
      notifyError('Selecione um endereço para entrega.');
      return;
    }
    if (!paymentMethod) {
      notifyError('Selecione um método de pagamento.');
      return;
    }

    try {
      const total = calculateTotal();
      const orderData = {
        id_user: user.id,
        id_address: pickupOption === 'delivery' ? selectedAddress : null,
        status: 'AWAITING',
        total: parseFloat(total),
      };

      // Criar a ordem no backend
      const createdOrder = await MyFetch('/orders', 'POST', orderData);
      if (!createdOrder) {
        notifyError('Erro ao criar o pedido.');
        return;
      }

      // Enviar os itens do pedido
      for (const item of cartItems) {
        const orderItemData = {
          id_order: createdOrder.id_order,
          id_product: item.product.connect.id_product,
          id_cuttingType: item.cuttingType.connect.id_cuttingType,
          quantity: item.quantity,
          priceOnTheDay: parseFloat(item.priceOnTheDay),
          description: item.description || '-',
        };

        const createdOrderItem = await MyFetch('/order-items', 'POST', orderItemData);
        if (!createdOrderItem) {
          notifyError(`Erro ao adicionar o item ${item.product.name} ao pedido.`);
          return;
        }
      }

      notifySuccess('Compra finalizada com sucesso!');
      localStorage.removeItem('cart');
      window.location.href = '/orders';
    } catch (error) {
      notifyError('Erro ao finalizar a compra');
    }
  };

  if (cartItems.length === 0) {
    return <Typography variant="h6" align="center">Seu carrinho está vazio.</Typography>;
  }

  return (
    <>
    <Navbar/>
    <Box sx={{ p: 3 }}>
      {/* Revisão do Pedido */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Revisão do Pedido</Typography>
        <Divider sx={{ my: 1 }} />
        {cartItems.map((item, index) => (
          <Typography key={index}>
            {item.product.name} - {item.quantity / 1000}Kg - R${(item.priceOnTheDay * (item.quantity / 1000)).toFixed(2)}
          </Typography>
        ))}
        <Typography variant="h6">Total: R${calculateTotal()}</Typography>
      </Box>

      {/* Entrega */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Entrega</Typography>
        <Divider sx={{ my: 1 }} />
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={pickupOption}
            onChange={(e) => setPickupOption(e.target.value)}
          >
            <FormControlLabel value="local" control={<Radio />} label="Retirada no Local" />
            <FormControlLabel value="delivery" control={<Radio />} label="Entrega" />
          </RadioGroup>
        </FormControl>
        {pickupOption === 'delivery' && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="address-select-label">Endereço de Entrega</InputLabel>
            <Select
              labelId="address-select-label"
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            >
              <MenuItem value="address1">Endereço 1</MenuItem>
              <MenuItem value="address2">Endereço 2</MenuItem>
            </Select>
          </FormControl>
        )}
        <Typography variant="body2" color="textSecondary">
          Tempo de espera: {waitingTime}
        </Typography>
      </Box>

      {/* Pagamento */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5">Pagamento</Typography>
        <Divider sx={{ my: 1 }} />
        <FormControl fullWidth>
          <InputLabel id="payment-method-label">Método de Pagamento</InputLabel>
          <Select
            labelId="payment-method-label"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value="credit">Cartão de Crédito</MenuItem>
            <MenuItem value="debit">Cartão de Débito</MenuItem>
            <MenuItem value="pix">Pix</MenuItem>
            <MenuItem value="cash">Dinheiro</MenuItem>
            <MenuItem value="food">Alimentação/Refeição</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleFinishOrder}
        fullWidth
      >
        Finalizar Compra
      </Button>
    </Box>
    </>
  );
};

export default OrderCheckout;
