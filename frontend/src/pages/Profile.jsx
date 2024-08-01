import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Divider, Modal, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import myfetch from '../utils/myfetch';
import Navbar from '../components/Navbar';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import History from '../components/History.jsx';


const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Minha Conta');
  const [editField, setEditField] = useState({ name: '', email: '' });
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
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
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await myfetch.get(`customer/${id}`);
        setUserData(data);
        const addressData = await myfetch.get(`customer/${id}/customerAddress`);
        setAddresses(addressData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleEditFieldChange = (field, value) => {
    setEditField({ ...editField, [field]: value });
  };

  const handlePasswordFieldChange = (field, value) => {
    setPasswordFields({ ...passwordFields, [field]: value });
  };

  const handleAddressFieldChange = (field, value) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedData = { ...userData, ...editField };
      await myfetch.put(`customer/${id}`, updatedData);
      setUserData(updatedData);
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSavePassword = async () => {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = passwordFields;
      if (newPassword !== confirmNewPassword) {
        alert("Nova senha e confirmação não correspondem!");
        return;
      }
      await myfetch.put(`customer/${id}/password`, { currentPassword, newPassword });
      alert("Senha alterada com sucesso!");
      setPasswordFields({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar a senha!");
    }
  };

  const handleSaveAddress = async () => {
    try {
      await myfetch.post(`customer/${id}/address`, newAddress);
      const updatedAddresses = await myfetch.get(`customer/${id}/addresses`);
      setAddresses(updatedAddresses);
      setAddressModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const maskedPhone = (phone) => phone.replace(/^(\d{2})(\d{1})(\d{4})(\d{2})(\d{2})$/, '($1)$2****-**$5');

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', bgcolor: '#121212', color: '#ffffff', height: '100vh', margin: '2% 5% 0 5%' }}>
        <Box sx={{ width: '250px', bgcolor: '#1f1f1f', p: 2 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Dados Pessoais
          </Typography>
          <List>
            {['Minha Conta', 'Segurança', 'Endereço', 'Histórico de Pedidos'].map((menu) => (
              <ListItem button key={menu} onClick={() => setSelectedMenu(menu)} selected={selectedMenu === menu}>
                <ListItemText primary={menu} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 1, p: 4 }}>
          {selectedMenu === 'Minha Conta' && (
            <Box display='flex' flexDirection='column'>
              <Typography variant="h5" gutterBottom>
                Minha Conta
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: '#f0f0f0' }} />
              <TextField
                label="Nome"
                variant="filled"
                value={userData.name || ''}
                disabled
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '& .MuiInputBase-input': {
                    color: '#f0f0f0',
                    WebkitTextFillColor: '#f0f0f0',
                    '&.Mui-disabled': {
                      color: '#f0f0f0 !important',
                      WebkitTextFillColor: '#f0f0f0 !important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#C62828',
                    '&.Mui-disabled': {
                      color: '#C62828 !important',
                    },
                  },
                }}
                fullWidth
              />
              <TextField
                label="CPF"
                variant="filled"
                value={userData.ident_document || ''}
                disabled
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '& .MuiInputBase-input': {
                    color: '#f0f0f0',
                    WebkitTextFillColor: '#f0f0f0',
                    '&.Mui-disabled': {
                      color: '#f0f0f0 !important',
                      WebkitTextFillColor: '#f0f0f0 !important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#C62828',
                    '&.Mui-disabled': {
                      color: '#C62828 !important',
                    },
                  },
                }}
                fullWidth
              />
              <TextField
                label="Data de Nascimento"
                variant="filled"
                type="date"
                value={userData.birth_date ? userData.birth_date.slice(0, 10) : ''}
                disabled
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '& .MuiInputBase-input': {
                    color: '#f0f0f0',
                    WebkitTextFillColor: '#f0f0f0',
                    '&.Mui-disabled': {
                      color: '#f0f0f0 !important',
                      WebkitTextFillColor: '#f0f0f0 !important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#C62828',
                    '&.Mui-disabled': {
                      color: '#C62828 !important',
                    },
                  },
                }}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Telefone"
                variant="filled"
                value={maskedPhone(userData.phone || '')}
                disabled
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '& .MuiInputBase-input': {
                    color: '#f0f0f0',
                    WebkitTextFillColor: '#f0f0f0',
                    '&.Mui-disabled': {
                      color: '#f0f0f0 !important',
                      WebkitTextFillColor: '#f0f0f0 !important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#C62828',
                    '&.Mui-disabled': {
                      color: '#C62828 !important',
                    },
                  },
                }}
                fullWidth
              />
              <TextField
                label="Email"
                variant="filled"
                value={userData.email || ''}
                disabled
                sx={{
                  mb: 2,
                  bgcolor: '#333',
                  '& .MuiInputBase-input': {
                    color: '#f0f0f0',
                    WebkitTextFillColor: '#f0f0f0',
                    '&.Mui-disabled': {
                      color: '#f0f0f0 !important',
                      WebkitTextFillColor: '#f0f0f0 !important',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#C62828',
                    '&.Mui-disabled': {
                      color: '#C62828 !important',
                    },
                  },
                }}
                fullWidth
              />
              <Button
                onClick={() => {
                  setEditField({ name: userData.name, email: userData.email });
                  setEditModalOpen(true);
                }}
                variant="contained"
                color="primary"
                sx={{ mt: 2, alignSelf: 'flex-end' }}
              >
                Editar
              </Button>
            </Box>
          )}
          {selectedMenu === 'Segurança' && (
            <Box display='flex' flexDirection='column' >
              <Typography variant="h5" gutterBottom>
                Segurança
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: '#f0f0f0' }} />
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Box display='flex' flexDirection='column' width='50%'>
                  <TextField
                    label="Senha Atual"
                    variant="filled"
                    type="password"
                    value={passwordFields.currentPassword}
                    onChange={(e) => handlePasswordFieldChange('currentPassword', e.target.value)}
                    sx={{
                      mb: 2,
                      bgcolor: '#333',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        color: '#f0f0f0',
                        WebkitTextFillColor: '#f0f0f0',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#C62828',
                      },
                    }}
                  />
                  <Divider sx={{ bgcolor: "primary.light", mb: '20px', width: '100%' }} />
                  <TextField
                    label="Nova Senha"
                    variant="filled"
                    type="password"
                    value={passwordFields.newPassword}
                    onChange={(e) => handlePasswordFieldChange('newPassword', e.target.value)}
                    sx={{
                      mb: 1,
                      bgcolor: '#333',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        color: '#f0f0f0',
                        WebkitTextFillColor: '#f0f0f0',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#C62828',
                      },
                    }}
                  />
                  <TextField
                    label="Confirmar Nova Senha"
                    variant="filled"
                    type="password"
                    value={passwordFields.confirmNewPassword}
                    onChange={(e) => handlePasswordFieldChange('confirmNewPassword', e.target.value)}
                    sx={{
                      mb: 1,
                      bgcolor: '#333',
                      width: '100%',
                      '& .MuiInputBase-input': {
                        color: '#f0f0f0',
                        WebkitTextFillColor: '#f0f0f0',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#C62828',
                      },
                    }}
                  />
                  <Button
                    onClick={handleSavePassword}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, alignSelf: 'flex-end' }}
                  >
                    Salvar
                  </Button>
                </Box>
                <Box>
                  <Divider orientation='vertical' sx={{ backgroundColor: '#303030' }} />
                </Box>
                <Box sx={{ width: '40%', textAlign: 'left', color: '#ffffff', pl: 2 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Dicas para uma boa senha:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    - Utilize ao menos 8 caracteres.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    - Combine letras maiúsculas e minúsculas.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    - Inclua números e símbolos.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    - Evite sequências óbvias ou informações pessoais.
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2, color: '#C62828' }}>
                    Nunca revele sua senha a ninguém.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {selectedMenu === 'Endereço' && (
            <Box>
              <Typography variant="h5" gutterBottom>
                Endereços
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: '#f0f0f0' }} />

              {addresses.map((customerAddress, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, bgcolor: '#1f1f1f', borderRadius: '4px', position: 'relative' }}>
                  <Typography variant="subtitle1">{customerAddress.street_name}, {customerAddress.house_number}</Typography>
                  <Typography variant="body2">{customerAddress.neighborhood}, {customerAddress.city} - {customerAddress.state}</Typography>
                  <Typography variant="body2">{customerAddress.complements}</Typography>
                  <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => handleDeleteAddress(index)} color="primary">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={() => handleSaveAddress(index)} color="secondary">
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
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
            </Box>
          )}
          {selectedMenu === 'Histórico de Pedidos' && (
            <Box display='flex' flexDirection='column' >
              <Typography variant="h5" gutterBottom>
                Pedidos Realizados
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: '#f0f0f0' }} />
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Box display='flex' flexDirection='column' width='50%'>
                  <History />
                </Box>
                <Box>
                  <Divider orientation='vertical' sx={{ backgroundColor: '#303030' }} />
                </Box>
                <Box sx={{ width: '40%', textAlign: 'left', color: '#ffffff', pl: 2 }}>
                  <Typography variant="h5" sx={{ mb: 3, textDecoration:'underline' }} >
                    Atenção, ao repetir uma compra:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }} >
                    Os preços dos produtos são atualizados conforme as variações do mercado. Portanto, valores podem sofrer alterações em futuras compras. 
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#C62828' }}>
                    Alguns produtos podem estar fora de estoque ou descontinuados.
                  </Typography>
                  <Typography variant="body2" >
                    Agradecemos a compreensão.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#f0f0f0',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <IconButton onClick={() => setEditModalOpen(false)} sx={{ position: 'absolute', left: 10, top: 10 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', mt: '0px' }}>
            Atualizar Dados
          </Typography>
          <TextField
            label="Nome"
            variant="filled"
            value={editField.name}
            onChange={(e) => handleEditFieldChange('name', e.target.value)}
            fullWidth
            sx={{
              width: '100%',
              mb: 2,
              bgcolor: '#f0f0f0',
              '& .MuiInputBase-input': { color: '#272727' },
              '& .MuiInputLabel-root': { color: '#8B0000' },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={() => setEditModalOpen(false)}
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
              onClick={handleSaveEdit}
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
    </>
  );
};

export default ProfilePage;
