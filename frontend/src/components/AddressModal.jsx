import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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
          const addressData = await myfetch.get('customerAddress');
          setAddresses(addressData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchAddresses();
    }
  }, [open]);

  const handleEdit = (id) => {
    // Função para editar o endereço
  };

  const handleDelete = (id) => {
    // Função para apagar o endereço
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
                  <Typography variant="body1">{address.street_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${address.city}, ${address.state}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(address.id_address)} sx={{ mr: 1 }}>
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

      <NewAddressModal open={isNewAddressModalOpen} onClose={() => setNewAddressModalOpen(false)} />
    </>
  );
};

export default AddressModal;
