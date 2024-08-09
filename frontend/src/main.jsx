import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação atualizada
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './utils/theme';

const root = ReactDOM.createRoot(document.getElementById('root')); // Criação da raiz

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
