// src/pages/Login.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  Modal,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../components/Navbar';
import Notification, { notifySuccess, notifyError } from '../components/Notification';
import logo from '../assets/logo/logo.png';
import { useNavigate } from 'react-router-dom';
import myfetch from '../utils/myfetch'; // Certifique-se de ajustar o caminho
import HttpError from '../utils/HttpError'; // Importar HttpError

const ForgotPasswordModal = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = () => {
    if (!email) {
      notifyError('Por favor, insira seu email.');
      return;
    }

    // Função de recuperação de senha removida.
    // Implemente a lógica desejada aqui, se necessário.
    notifySuccess('Função de recuperação de senha não está implementada.');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#1b1b1b' }}>
          Esqueceu sua senha?
        </Typography>
        <TextField
          fullWidth
          label="Digite seu email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'initial', // Cor inicial
              },
              '&:hover fieldset': {
                borderColor: 'lightcoral', // Borda vermelho clara ao passar o mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'darkred', // Borda vermelho escuro ao focar
              },
            },
            '& .MuiInputBase-input': {
              color: '#1b1b1b', // Cor do texto
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleForgotPassword}
          fullWidth
        >
          Enviar
        </Button>
      </Box>
    </Modal>
  );
};

const Login = () => {
  const navigate = useNavigate(); // Inicializar navigate

  // Estados para login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Estado para controlar a modal de "Esqueceu sua senha"
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  // Handlers para login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    // Validações de login
    if (!loginData.email || !loginData.password) {
      notifyError('Por favor, preencha todos os campos de login.');
      return;
    }

    try {
      // Requisição para autenticar o usuário usando myfetch.post
      const userData = await myfetch.post('/user/login', {
        email: loginData.email,
        password: loginData.password,
      });

      // Salvar dados do usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        id: userData.id_user,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        // Remova a senha do localStorage por motivos de segurança
        // password: userData.password
      }));

      notifySuccess('Login realizado com sucesso!');
      navigate('/'); // Redirecionar para a Home após login

      // Limpa os campos do formulário de login
      setLoginData({
        email: '',
        password: '',
      });
    } catch (error) {
      if (error instanceof HttpError) {
        notifyError(error.message);
      } else {
        console.error('Erro ao realizar login:', error);
        notifyError('Erro ao conectar com o servidor');
      }
    }
  };

  useEffect(() => {
    // Função de limpeza ao desmontar o componente
    return () => {
      setLoginData({
        email: '',
        password: '',
      });
    };
  }, []);

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
              Entrar
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Paper variant="outlined" sx={{ padding: 2, marginBottom: 1, backgroundColor: '#800000', borderColor: '#b0b0b0', borderWidth: 1, width: '340px', alignSelf: 'center' }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      margin="normal"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
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
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Senha"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
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
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLoginSubmit}
                    sx={{ width: '170px' }}
                  >
                    Entrar
                  </Button>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Button
                    variant="text"
                    color="tertiary"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    sx={{ width: 'auto', textDecoration: 'underline', color: '#f0f0f0' }}
                  >
                    Esqueceu sua senha?
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Box>
      </Container>
      {/* Modal de "Esqueceu sua senha" */}
      <ForgotPasswordModal
        open={isForgotPasswordOpen}
        handleClose={() => setIsForgotPasswordOpen(false)}
      />
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: '#f0f0f0' }}>
          Não tem uma conta?{' '}
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/signup')}
            sx={{ textDecoration: 'underline' }}
          >
            Cadastre-se
          </Button>
        </Typography>
      </Box>
      <Notification />
    </>
  );
};

export default Login;
