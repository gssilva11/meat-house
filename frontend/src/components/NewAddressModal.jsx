import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NewAddressModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    id_customer: '',
    street_name: '',
    house_number: '',
    complements: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
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
          Cadastrar Novo Endereço
        </Typography>
        <TextField
          fullWidth
          label="ID do Cliente"
          name="id_customer"
          value={formData.id_customer}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Nome da Rua"
          name="street_name"
          value={formData.street_name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Número da Casa"
          name="house_number"
          value={formData.house_number}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Complementos"
          name="complements"
          value={formData.complements}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Bairro"
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <MenuItem value="SP">SP</MenuItem>
            <MenuItem value="MG">MG</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Cadastrar
        </Button>
      </Box>
    </Modal>
  );
};

export default NewAddressModal;
