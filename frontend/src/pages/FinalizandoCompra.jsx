import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  TextField,
  IconButton
} from '@mui/material';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';

const FinalizandoCompra = () => {
  const [itens, setItens] = useState([
    // Exemplo de itens no carrinho
    { id: 1, name: 'Produto 1', quantidade: 1, price: 10.0 },
    { id: 2, name: 'Produto 2', quantidade: 2, price: 20.0 },
  ]);
  const [etapa, setEtapa] = useState(1);
  const [entrega, setEntrega] = useState(false);
  const [endereco, setEndereco] = useState({
    cep: '12345-678',
    cidade: 'Cidade',
    estado: 'Estado',
    bairro: 'Bairro',
    rua: 'Rua',
    numero: '123',
    complemento: 'Apt 1',
  });

  const handleRemoverItem = (id) => {
    setItens(itens.filter((item) => item.id !== id));
  };

  const handleAlterarQuantidade = (id, quantidade) => {
    setItens(
      itens.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      )
    );
  };

  const handleProsseguirCompra = () => {
    setEtapa(2);
  };

  const handleSelecionarEntrega = () => {
    setEntrega(true);
  };

  const handleSelecionarRetirada = () => {
    setEntrega(false);
  };

  const handleConfirmarPedido = () => {
    // Lógica para confirmar pedido
  };

  const handleFinalizarPedido = () => {
    // Lógica para finalizar pedido
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {etapa === 1 && (
            <>
              <Typography variant="h4" gutterBottom>
                Finalizando Compra
              </Typography>
              {itens.map((item) => (
                <Paper key={item.id} variant="outlined" sx={{ padding: 2, marginBottom: 1 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body1">Preço: R${item.price}</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        type="number"
                        label="Quantidade"
                        value={item.quantidade}
                        onChange={(e) => handleAlterarQuantidade(item.id, parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <IconButton onClick={() => handleRemoverItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
              <Button variant="contained" color="primary" onClick={handleProsseguirCompra}>
                Prosseguir com a compra
              </Button>
            </>
          )}
          {etapa === 2 && (
            <>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom>
                Escolha a opção de entrega
              </Typography>
              <Button
                variant="contained"
                color={entrega ? "primary" : "default"}
                onClick={handleSelecionarEntrega}
                sx={{ marginRight: 2 }}
              >
                Entrega a domicílio
              </Button>
              <Button
                variant="contained"
                color={!entrega ? "primary" : "default"}
                onClick={handleSelecionarRetirada}
              >
                Retirada no local
              </Button>
              {entrega && (
                <Paper variant="outlined" sx={{ padding: 2, marginTop: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Endereço de entrega
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="CEP"
                        value={endereco.cep}
                        onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Cidade"
                        value={endereco.cidade}
                        onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <TextField
                        fullWidth
                        label="Estado"
                        value={endereco.estado}
                        onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Bairro"
                        value={endereco.bairro}
                        onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Rua"
                        value={endereco.rua}
                        onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <TextField
                        fullWidth
                        label="N°"
                        value={endereco.numero}
                        onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <TextField
                        fullWidth
                        label="Complemento"
                        value={endereco.complemento}
                        onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={entrega ? handleFinalizarPedido : handleConfirmarPedido}
                sx={{ mt: 2 }}
              >
                {entrega ? 'Finalizar Pedido' : 'Confirmar Pedido'}
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default FinalizandoCompra;
