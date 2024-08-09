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
import Address from '../components/Address.jsx';

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        console.error('User ID is undefined');
        return;
      }
      try {
        const data = await myfetch.get(`customer/${id}`);
        setUserData(data);
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
            <Box display='flex' flexDirection='column'>
              <Typography variant="h5" gutterBottom>
                Endereços cadastrados:
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: '#f0f0f0' }} />
              <Box display='flex' justifyContent='space-between' width='100%'>
                <Box display='flex' flexDirection='column' width='50%'>
                  <Address userId={id} />
                </Box>
                <Box>
                  <Divider orientation='vertical' sx={{ backgroundColor: '#303030' }} />
                </Box>
                <Box sx={{ width: '40%', textAlign: 'left', color: '#ffffff', pl: 2 }}>
                  <Typography variant="body2" sx={{ mb: 2, color: '#f0f0f0' }}>
                    Você pode ter até 3 endereços vinculados a sua conta.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#f0f0f0' }}>
                    Recomendamos incluir um complemento de endereço para garantir que suas entregas sejam realizadas corretamente.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#f0f0f0' }}>
                    Por favor, certifique-se de que os endereços inseridos estejam atualizados e completos.
                  </Typography>
                  <Typography variant="body2" color='#f0f0f0'>
                    Agradecemos a sua colaboração!
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}

          {selectedMenu === 'Histórico de Pedidos' && (
            <Box display='flex' flexDirection='column'>
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
                  <Typography variant="h5" sx={{ mb: 3, textDecoration: 'underline' }}>
                    Atenção, ao repetir uma compra:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Os preços dos produtos são atualizados conforme as variações do mercado. Portanto, valores podem sofrer alterações em futuras compras.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, color: '#C62828' }}>
                    Alguns produtos podem estar fora de estoque ou descontinuados.
                  </Typography>
                  <Typography variant="body2">
                    Agradecemos a compreensão.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Editar Perfil
          </Typography>
          <TextField
            label="Nome"
            variant="filled"
            value={editField.name}
            onChange={(e) => handleEditFieldChange('name', e.target.value)}
            sx={{ mb: 2, width: '100%' }}
          />
          {/* <TextField
            label="Email"
            variant="filled"
            value={editField.email}
            onChange={(e) => handleEditFieldChange('email', e.target.value)}
            sx={{ mb: 2, width: '100%' }}
          /> */}
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            Salvar
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfilePage;
