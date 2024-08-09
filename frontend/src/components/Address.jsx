import React, { useState, useEffect } from 'react';
import { Box, IconButton, Modal, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import myfetch from '../utils/myfetch';

const Address = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street_name: '',
    house_number: '',
    complements: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      if (userId) {
        try {
          const addressData = await myfetch.get(`customer/${userId}/address`);
          console.log('Fetched address data:', addressData); // Adicionado log para depuração
          setAddresses(addressData);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleAddressFieldChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const handleSaveAddress = async () => {
    try {
      await myfetch.post(`customer/${userId}/address`, newAddress);
      const updatedAddresses = await myfetch.get(`customer/${userId}/address`);
      console.log('Updated address data:', updatedAddresses); // Adicionado log para depuração
      setAddresses(updatedAddresses);
      setAddressModalOpen(false);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <Box>
      <Box>
        <List>
          {addresses.map((address, index) => (
            <ListItem key={index} sx={{ mb: 2, p: 2, bgcolor: '#1f1f1f', borderRadius: '4px', position: 'relative' }}>
              <ListItemText
                primary={`${address.street_name}, ${address.house_number}`}
                secondary={`${address.neighborhood}, ${address.city} - ${address.state} \n ${address.complements}`}
              />
              <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                <IconButton color="primary">
                  <DeleteIcon />
                </IconButton>
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      {addresses.length < 3 && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#272727',
            borderRadius: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px'
          }}
        >
          <IconButton onClick={() => setAddressModalOpen(true)} color="primary">
            <AddIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      )}
      <Modal open={addressModalOpen} onClose={() => setAddressModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: '#f0f0f0',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <IconButton onClick={() => setAddressModalOpen(false)} sx={{ position: 'absolute', left: 10, top: 10 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', mt: '0px' }}>
            Cadastrar Novo Endereço
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <TextField
              label="Nome da Rua"
              variant="filled"
              value={newAddress.street_name}
              onChange={(e) => handleAddressFieldChange('street_name', e.target.value)}
              sx={{
                width: '100%',
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
            />
            <TextField
              label="Número da Casa"
              variant="filled"
              value={newAddress.house_number}
              onChange={(e) => handleAddressFieldChange('house_number', e.target.value)}
              sx={{
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <TextField
              label="Complementos"
              variant="filled"
              value={newAddress.complements}
              onChange={(e) => handleAddressFieldChange('complements', e.target.value)}
              sx={{
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
              fullWidth
            />
            <TextField
              label="Bairro"
              variant="filled"
              value={newAddress.neighborhood}
              onChange={(e) => handleAddressFieldChange('neighborhood', e.target.value)}
              sx={{
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
            <TextField
              label="Cidade"
              variant="filled"
              value={newAddress.city}
              onChange={(e) => handleAddressFieldChange('city', e.target.value)}
              sx={{
                width: '100%',
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
            />
            <TextField
              label="Estado"
              variant="filled"
              value={newAddress.state}
              onChange={(e) => handleAddressFieldChange('state', e.target.value)}
              sx={{
                mb: 2,
                bgcolor: '#f0f0f0',
                '& .MuiInputBase-input': { color: '#272727' },
                '& .MuiInputLabel-root': { color: '#8B0000' },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => setAddressModalOpen(false)}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#8B0000',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                mr: '10px'
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAddress}
              sx={{
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#600000',
                },
              }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Address;
