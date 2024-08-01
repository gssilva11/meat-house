import React, { useState } from 'react';
import { Paper, Typography, Select, MenuItem, TextField, Button, FormControl, InputLabel, Box, Grid } from '@mui/material';
import Navbar from '../components/Navbar';

const Cadastro = () => {
  const [cadastroTipo, setCadastroTipo] = useState('produto');
  const [produto, setProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [tipoCorte, setTipoCorte] = useState('');

  const handleChangeTipo = (event) => {
    setCadastroTipo(event.target.value);
  };

  const handleProdutoChange = (event) => {
    setProduto({
      ...produto,
      [event.target.name]: event.target.value
    });
  };

  const handleTipoCorteChange = (event) => {
    setTipoCorte(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cadastroTipo === 'produto') {
      console.log('Produto cadastrado:', produto);
      // Aqui você pode adicionar a lógica para enviar os dados do produto para o banco de dados
    } else {
      console.log('Tipo de corte cadastrado:', tipoCorte);
      // Aqui você pode adicionar a lógica para enviar o tipo de corte para o banco de dados
    }
  };

  return (
    <div>
      <Navbar />
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: '20px auto', mb:'200px' }}>
        <Typography variant="h5" gutterBottom>
          {cadastroTipo === 'produto' ? 'Cadastro de Produtos' : 'Cadastro de Tipos de Corte'}
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-cadastro-label">Tipo de Cadastro</InputLabel>
          <Select
            labelId="tipo-cadastro-label"
            value={cadastroTipo}
            onChange={handleChangeTipo}
            label="Tipo de Cadastro"
          >
            <MenuItem value="produto">Produto</MenuItem>
            <MenuItem value="tipoCorte">Tipo de Corte</MenuItem>
          </Select>
        </FormControl>
        {cadastroTipo === 'produto' ? (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Nome do Produto"
              name="nome"
              value={produto.nome}
              onChange={handleProdutoChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Preço do Produto (R$)"
                  name="preco"
                  type="number"
                  value={produto.preco}
                  onChange={handleProdutoChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Quantidade (em gramas)"
                  name="quantidade"
                  type="number"
                  value={produto.quantidade}
                  onChange={handleProdutoChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <TextField
            fullWidth
            margin="normal"
            label="Nome de Corte"
            value={tipoCorte}
            onChange={handleTipoCorteChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {cadastroTipo === 'produto' ? 'Cadastrar Produto' : 'Cadastrar Tipo de Corte'}
        </Button>
      </Paper>
    </div>
  );
};

export default Cadastro;
