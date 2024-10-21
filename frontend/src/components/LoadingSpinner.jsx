import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = 'Carregando...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ajusta o tamanho para o centro da tela
        width: '100%',
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" sx={{ mt: '2m', color:'#f0f0f0' }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
