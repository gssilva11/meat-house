import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NewAddressModal from './NewAddressModal'; // Importe a segunda modal
import myfetch from '../utils/myfetch';

const AddressModal = ({ open, onClose }) => {
  const [addresses, setAddresses] = useState([]);
  const [isNewAddressModalOpen, setNewAddressModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    if (open) {
      const fetchAddresses = async () => {
        try {
          const addressData = await myfetch.get('/customerAddress'); // Corrigida a rota para '/customerAddress'
          setAddresses(addressData);
        } catch (error) {
          console.error('Erro ao buscar endereços:', error);
        }
      };

      fetchAddresses();
    }
  }, [open]);

  const handleEdit = (id) => {
    // Função para editar o endereço
    console.log('Editar endereço:', id);
  };

  const handleDelete = async (id) => {
    try {
      await myfetch.delete(`/address/${id}`); // Corrigida a rota de exclusão
      setAddresses(addresses.filter((address) => address.id_address !== id));
      console.log('Endereço excluído:', id);
    } catch (error) {
      console.error('Erro ao excluir endereço:', error);
    }
  };

  const handleNewAddress = () => {
    setNewAddressModalOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '80%' : 600,
            bgcolor: 'background.paper',
            border: '2px solid #C62828',
            boxShadow: 24,
            p: 4,
            borderRadius: 1
          }}
        >
          <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, left: 16 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Endereços Cadastrados
          </Typography>
          <List>
            {addresses.map((address) => (
              <Card key={address.id_address} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">{`${address.street_name}, ${address.house_number}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${address.neighborhood}, ${address.city} - ${address.state}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {address.complements}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(address.id_address)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(address.id_address)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </List>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleNewAddress}
            sx={{ mt: 2 }}
          >
            Adicionar Endereço
          </Button>
        </Box>
      </Modal>

      <NewAddressModal
        open={isNewAddressModalOpen}
        onClose={() => setNewAddressModalOpen(false)}
      />
    </>
  );
};

export default AddressModal;
