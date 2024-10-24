import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
} from '@mui/material';
import Navbar from '../components/Navbar';
import Notification, { notifySuccess, notifyError } from '../components/Notification';
import logo from '../assets/logo/logo.png';
import myfetch from '../utils/myfetch'; // Importando myfetch
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Signup = () => {
  const navigate = useNavigate(); // Inicializar navigate

  // Estados para cadastro
  const [signupData, setSignupData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Função para validação de e-mail
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handlers para cadastro
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = async () => {
    // Validações de cadastro
    if (signupData.password.length < 8) {
      notifyError('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      notifyError('As senhas não coincidem');
      return;
    }

    if (!validateEmail(signupData.email)) {
      notifyError('O formato do e-mail é inválido');
      return;
    }

    const userData = {
      first_name: signupData.first_name,
      last_name: signupData.last_name,
      phone: signupData.phone,
      email: signupData.email,
      password: signupData.password, // Enviando a senha diretamente
    };

    try {
      // Usando myfetch para criar usuário com os parâmetros corretos
      const response = await myfetch.post('/user', userData);

      if (response.message === 'Usuário criado com sucesso') {
        notifySuccess('Cadastro realizado com sucesso!');
        setSignupData({
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          password: ''
        });
        // Navega após o estado ser resetado
        setTimeout(() => {
          navigate('/login');
        }, 500);
      } else {
        notifyError(response.message || 'Erro ao criar usuário');
      }
    } catch (e) {
      console.error('Erro na criação do usuário:', e);
      notifyError(e.message || 'Erro ao criar usuário. Por favor, tente novamente.');
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
            <Typography variant="h4" gutterBottom sx={{ color: '#f0f0f0', textAlign: 'center' }}>
              Cadastrar-se
            </Typography>
            <Box display="flex" justifyContent="center">
              <Paper variant="outlined" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#272727', borderColor: '#b0b0b0', borderWidth: 1, width: '600px' }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#f0f0f0' }}>
                  Dados Pessoais
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nome"
                      margin="normal"
                      variant="outlined"
                      name="first_name"
                      value={signupData.first_name}
                      onChange={handleSignupChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f0f0f0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f0f0f0',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#f0f0f0',
                        },
                        '& .MuiInputBase-input': {
                          color: '#f0f0f0',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Sobrenome"
                      margin="normal"
                      variant="outlined"
                      name="last_name"
                      value={signupData.last_name}
                      onChange={handleSignupChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f0f0f0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f0f0f0',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#f0f0f0',
                        },
                        '& .MuiInputBase-input': {
                          color: '#f0f0f0',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputMask
                      mask="(99) 99999-9999"
                      value={signupData.phone}
                      onChange={handleSignupChange}
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
                          InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: '#b0b0b0',
                              },
                              '&:hover fieldset': {
                                borderColor: '#f0f0f0',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#f0f0f0',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: '#f0f0f0',
                            },
                            '& .MuiInputBase-input': {
                              color: '#f0f0f0',
                            },
                          }}
                        />
                      )}
                    </InputMask>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f0f0f0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f0f0f0',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#f0f0f0',
                        },
                        '& .MuiInputBase-input': {
                          color: '#f0f0f0',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      label="Senha"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f0f0f0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f0f0f0',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#f0f0f0',
                        },
                        '& .MuiInputBase-input': {
                          color: '#f0f0f0',
                        },
                      }}
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
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: '#f0f0f0' },
                      }}
                      InputProps={{ style: { height: '40px', color: '#f0f0f0' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#b0b0b0',
                          },
                          '&:hover fieldset': {
                            borderColor: '#f0f0f0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#f0f0f0',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: '#f0f0f0',
                        },
                        '& .MuiInputBase-input': {
                          color: '#f0f0f0',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                  <Button variant="contained" color="primary" onClick={handleSignupSubmit}>
                    Cadastrar
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#f0f0f0' }}>
          Já tem uma conta?{' '}
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/login')}
            sx={{ textDecoration: 'underline' }}
          >
            Entrar
          </Button>
        </Typography>
      </Box>
      <Notification />
    </>
  );
};

export default Signup;
