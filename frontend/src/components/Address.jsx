import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import myfetch from '../utils/myfetch';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street_name: '',
    house_number: '',
    complements: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  // Buscar o ID do usuário do localStorage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAddresses = async () => {
      if (userId) {
        try {
          const addressData = await myfetch.get(`/customer/${userId}/address`);
          setAddresses(addressData);
        } catch (error) {
          console.error('Erro ao buscar endereços:', error);
        }
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleAddressFieldChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async () => {
    // Verifique se todos os campos necessários estão preenchidos
    const { street_name, house_number, neighborhood, city, state } = newAddress;
  
    if (!street_name || !house_number || !neighborhood || !city || !state) {
      console.error('Preencha todos os campos obrigatórios');
      return;
    }
  
    try {
      // Adicione o ID do usuário no corpo da requisição com a chave correta
      const addressToSave = { ...newAddress, user_id: userId };
      await myfetch.post('/address', addressToSave);
      setAddresses(updatedAddresses);
      setAddressModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
    }
  };
  

  return (
    <Box>
      <List>
        {addresses.map((address, index) => (
          <ListItem
            key={index}
            sx={{
              mb: 2,
              p: 2,
              bgcolor: '#1f1f1f',
              borderRadius: '4px',
              position: 'relative',
            }}
          >
            <ListItemText
              primary={`${address.street_name}, ${address.house_number}`}
              secondary={`${address.neighborhood}, ${address.city} - ${address.state}\n${address.complements}`}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 1,
              }}
            >
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
            height: '100px',
          }}
        >
          <IconButton
            onClick={() => setAddressModalOpen(true)}
            color="primary"
          >
            <AddIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>
      )}
      <Modal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      >
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
            gap: '1rem',
          }}
        >
          <IconButton
            onClick={() => setAddressModalOpen(false)}
            sx={{ position: 'absolute', left: 10, top: 10 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Cadastrar Novo Endereço
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField
              label="Nome da Rua"
              variant="filled"
              value={newAddress.street_name}
              onChange={(e) =>
                handleAddressFieldChange('street_name', e.target.value)
              }
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
            />
            <TextField
              label="Número da Casa"
              variant="filled"
              value={newAddress.house_number}
              onChange={(e) =>
                handleAddressFieldChange('house_number', e.target.value)
              }
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField
              label="Complementos"
              variant="filled"
              value={newAddress.complements}
              onChange={(e) =>
                handleAddressFieldChange('complements', e.target.value)
              }
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
            />
            <TextField
              label="Bairro"
              variant="filled"
              value={newAddress.neighborhood}
              onChange={(e) =>
                handleAddressFieldChange('neighborhood', e.target.value)
              }
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <TextField
              label="Cidade"
              variant="filled"
              value={newAddress.city}
              onChange={(e) => handleAddressFieldChange('city', e.target.value)}
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
            />
            <TextField
              label="Estado"
              variant="filled"
              value={newAddress.state}
              onChange={(e) => handleAddressFieldChange('state', e.target.value)}
              fullWidth
              sx={{ mb: 2, bgcolor: '#f0f0f0' }}
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
                mr: '10px',
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
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
