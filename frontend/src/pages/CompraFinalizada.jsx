// src/pages/CompraFinalizada.jsx

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid
} from '@mui/material';
import Navbar from '../components/Navbar';

const steps = [
  'Pedido realizado',
  'Em análise',
  'Pedido aceito',
  'Pronto para retirada/Entrega'
];

const CompraFinalizada = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Pedido realizado com sucesso!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Pedido
          </Typography>
          <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2 }}>
            {/* Resumo do pedido */}
            <Typography variant="body1">Produto 1 - Quantidade: 1 - Preço: R$10.00</Typography>
            <Typography variant="body1">Produto 2 - Quantidade: 2 - Preço: R$20.00</Typography>
            {/* Adicione outros itens conforme necessário */}
          </Paper>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ my: 4 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Precisa de ajuda?
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary">
                  Avalie o app
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CompraFinalizada;
