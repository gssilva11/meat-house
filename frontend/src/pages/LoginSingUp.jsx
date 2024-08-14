import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  Divider
} from '@mui/material';
import Navbar from '../components/Navbar';
import Notification, { notifySuccess, notifyError } from '../components/Notification';
import logo from '../assets/logo/logo.png'; // Certifique-se de que o caminho está correto
import InputMask from 'react-input-mask';
import myfetch from '../utils/myfetch'; // Supondo que você tenha uma função utilitária para chamadas API

const LoginCadastro = () => {
  const [formData, setFormData] = useState({
    name: '',
    ident_document: '',
    birth_date: '',
    phone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    loginEmail: '',
    loginSenha: '',
  });
  const [isLogin, setIsLogin] = useState(true); // Controla o modo de exibição

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDateToISO = (dateStr) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dateStr.match(regex);

    if (match) {
      const [, day, month, year] = match;
      const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
      return formattedDate;
    }

    return null;
  };

  const handleSubmit = async () => {
    if (isLogin) {
      // Lógica de login
    //   try {
    //     const response = await myfetch.post('login', {
    //       email: formData.loginEmail,
    //       password: formData.loginSenha,
    //     });

    //     if (response) {
    //       notifySuccess('Login realizado com sucesso!');
    //       setFormData({
    //         ...formData,
    //         loginEmail: '',
    //         loginSenha: '',
    //       });
    //       // Redirecionar ou tratar o sucesso do login aqui
    //     } else {
    //       notifyError('Erro ao fazer login');
    //     }
    //   } catch (e) {
    //     console.error('Erro ao fazer login:', e);
    //     notifyError('Erro ao fazer login. Por favor, tente novamente.');
    //   }
    // } else {
      // Lógica de cadastro
      if (!formData.birth_date) {
        notifyError('Data de nascimento é obrigatória');
        return;
      }

      if (formData.senha.length < 8) {
        notifyError('A senha deve ter no mínimo 8 caracteres');
        return;
      }

      if (formData.senha !== formData.confirmarSenha) {
        notifyError('As senhas não coincidem');
        return;
      }

      const formattedDate = formatDateToISO(formData.birth_date);
      if (!formattedDate) {
        notifyError('Data de nascimento inválida');
        return;
      }

      const customerData = {
        name: formData.name,
        ident_document: formData.ident_document,
        birth_date: formattedDate,
        phone: formData.phone,
        email: formData.email,
        // `senha` não é enviada diretamente para o backend. Normalmente, a senha deve ser criptografada antes de ser armazenada
      };

      try {
        // Enviar dados para o backend para criar o cliente
        const response = await myfetch.post('customer', customerData);

        if (response) {
          notifySuccess('Cadastro realizado com sucesso!');
          setFormData({
            name: '',
            ident_document: '',
            birth_date: '',
            phone: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            loginEmail: '',
            loginSenha: '',
          });
          return;
        } else {
          notifyError('Erro ao criar cliente');
        }
      } catch (e) {
        console.error('Erro na criação do cliente:', e);
        notifyError('Erro ao criar cliente. Por favor, tente novamente.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="Logo" style={{ height: '100px' }} />
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
              <Grid>
                <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0' }}>
                  Entrar
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Paper variant="outlined" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#800000', borderColor: '#b0b0b0', borderWidth: 1, width: '320px', alignSelf: 'center' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Email"
                          margin="normal"
                          variant="outlined"
                          type="email"
                          name="loginEmail"
                          value={formData.loginEmail}
                          onChange={handleChange}
                          InputLabelProps={{
                            shrink: true,
                            style: { color: '#f0f0f0' },
                          }}
                          InputProps={{ style: { height: '40px' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          label="Senha"
                          margin="normal"
                          variant="outlined"
                          type="password"
                          name="loginSenha"
                          value={formData.loginSenha}
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
                        sx={{ width: '170px'}}
                      >
                        Entrar
                      </Button>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2}}>
                      <Button
                        variant="text"
                        color="tertiary"
                        onClick={() => setIsLogin(false)}
                        sx={{ width:'auto', textDecoration:'underline', color:'#f0f0f0' }}
                      >
                        Esqueceu sua senha?
                      </Button>
                    </Box>
                  </Paper>
                </Box>

                <Divider orientation="vertical" flexItem sx={{ mx: 5, borderColor: '#fff' }} />
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
