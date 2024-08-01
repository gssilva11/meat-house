import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  Container,
  Paper,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Notification, { notifySuccess, notifyError } from '../components/Notification';
import logo from '../assets/logo/logo.png'; // Certifique-se de que o caminho está correto
import InputMask from 'react-input-mask';
import Customer from '../models/Customer';

const LoginCadastro = () => {
  const [formData, setFormData] = useState({
    name: '',
    ident_document: '',
    birth_date: '',
    phone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDateToISO = (dateStr) => {
    // Verifica se a data está no formato esperado
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);
    
    if (match) {
      const [, day, month, year] = match;
      const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
      return formattedDate; // Retorna o objeto Date
    }
    
    return null; // Retorna null se a data não estiver no formato esperado
  };

  const handleSubmit = () => {
    if (!formData.birth_date) {
      notifyError('Data de nascimento é obrigatória');
      return;
    }

    const formattedDate = formatDateToISO(formData.birth_date);
    if (!formattedDate) {
      notifyError('Data de nascimento inválida');
      return;
    }

    const customerData = {
      ...formData,
      birth_date: formattedDate, // Converter para objeto Date
    };

    try {
      const validData = Customer.parse(customerData);
      notifySuccess('Cadastro realizado com sucesso!');
      // Reset form fields after successful submission
      setFormData({
        name: '',
        ident_document: '',
        birth_date: '',
        phone: '',
        email: '',
        senha: '',
        confirmarSenha: '',
      });
    } catch (e) {
      console.error('Erro na validação:', e.errors);
      notifyError('Erro na validação dos dados. Por favor, verifique os campos e tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Casa de Carnes Logo" style={{ height: '100px' }} />
          </Box>
          <Paper variant="elevation" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#020002' }}>
            <Grid container spacing={0} justifyContent="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0' }}>
                  Cadastrar-se
                </Typography>
                <Paper variant="outlined" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#272727', borderColor: '#b0b0b0', borderWidth: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#f0f0f0' }}>
                    Dados Pessoais
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={8}>
                      <TextField
                        required
                        fullWidth
                        label="Nome"
                        margin="normal"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#f0f0f0' },
                        }}
                        InputProps={{ style: { height: '40px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        value={formData.ident_document}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            required
                            fullWidth
                            label="CPF"
                            margin="normal"
                            variant="outlined"
                            name="ident_document"
                            InputLabelProps={{
                              shrink: true,
                              style: { color: '#f0f0f0' },
                            }}
                            InputProps={{ style: { height: '40px' } }}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputMask
                        mask="99/99/9999"
                        maskChar="_"
                        value={formData.birth_date}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            required
                            fullWidth
                            label="Data de Nascimento"
                            margin="normal"
                            variant="outlined"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true, style: { color: '#f0f0f0' } }}
                            InputProps={{ style: { height: '40px' } }}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputMask
                        mask="(99) 99999-9999"
                        maskChar=" "
                        value={formData.phone}
                        onChange={handleChange}
                      >
                        {() => (
                          <TextField
                            required
                            fullWidth
                            label="Telefone"
                            margin="normal"
                            variant="outlined"
                            name="phone"
                            InputLabelProps={{
                              shrink: true,
                              style: { color: '#f0f0f0' },
                            }}
                            InputProps={{ style: { height: '40px' } }}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#f0f0f0' },
                        }}
                        InputProps={{ style: { height: '40px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Senha"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#f0f0f0' },
                        }}
                        InputProps={{ style: { height: '40px' } }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        required
                        fullWidth
                        label="Confirmar Senha"
                        margin="normal"
                        variant="outlined"
                        type="password"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                          style: { color: '#f0f0f0' },
                        }}
                        InputProps={{ style: { height: '40px' } }}
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Cadastrar
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Divider orientation="vertical" flexItem sx={{ mx: 5, borderColor: '#fff' }} />
              <Grid item xs={12} md={3}>
                <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0' }}>
                  Entrar
                </Typography>
                <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2, backgroundColor: '#840404', borderColor: '#b0b0b0', borderWidth: 1 }}>
                  <form noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      type="email"
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px' } }}
                    />
                    <TextField
                      fullWidth
                      label="Senha"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px' } }}
                    />
                    <Button variant="contained" color="tertiary" sx={{ mt: 2, color: '#f0f0f0' }} fullWidth>
                      Entrar
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
      <Notification />
    </>
  );
};

export default LoginCadastro;
