import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import myfetch from '../utils/myfetch';
import Navbar from '../components/Navbar';
import ButtonsPageTable from '../components/ButtonsPageTable.jsx';
import InputMask from 'react-input-mask';

const UpdateShowcase = () => {
  const [products, setProducts] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editProduct, setEditProduct] = useState({
    id_product: '',
    name: '',
    price: '',
    imageProduct: '',
    category: '',
    availability: false
  });
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageProduct: '',
    category: '',
    availability: true
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await myfetch.get('product');
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [setProducts, setCategories]);

  const reloadProducts = async () => {
    try {
      const data = await myfetch.get('product');
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleEditClick = async (product) => {
    try {
      const data = await myfetch.get(`product/${product.id_product}`);
      setEditProduct(data);
      setEditModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = {
        ...editProduct,
        price: Number(parseFloat(editProduct.price).toFixed(2))
      };
      await myfetch.put(`product/${editProduct.id_product}`, updatedProduct);
      reloadProducts();
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCreateProduct = async () => {
    try {
      const createdProduct = {
        ...newProduct,
        price: Number(parseFloat(newProduct.price).toFixed(2))
      };
      const data = await myfetch.post('product', createdProduct);
      setProducts([...products, data]);
      setCreateModalOpen(false);
      setNewProduct({
        name: '',
        price: '',
        weight: '',
        imageProduct: '',
        category: '',
        availability: true
      });
      reloadProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteInput === 'EXCLUIR') {
      try {
        await myfetch.delete(`product/${productToDelete.id_product}`);
        await reloadProducts();
        setDeleteModalOpen(false);
        setDeleteInput('');
        setDeleteError(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setDeleteError(true);
    }
  };

  const filteredProducts = products.filter(product =>
    (product.name?.toLowerCase().includes(filterName.toLowerCase())) &&
    (product.category?.toLowerCase().includes(filterCategory.toLowerCase()))
  );

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'price', headerName: 'Preço (R$)', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'weight', headerName: 'Peso (g)', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'category', headerName: 'Categoria', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'availability',
      headerName: 'Disponibilidade',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row)} sx={{ marginRight: '15px' }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '900px', color: '#272727', margin: '0 1%', borderRadius: '2px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" align="left" gutterBottom>Vitrine de Produtos</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
          <Box>
            <TextField
              label="Buscar por nome"
              variant="outlined"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              sx={{
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                '& .MuiInputBase-input': {
                  color: '#020002',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#020002',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
                mr: '15px'
              }}
            />
            <FormControl
              variant="outlined"
              sx={{
                minWidth: 120,
                backgroundColor: '#FFFFFF',
                borderRadius: '4px',
                '& .MuiInputBase-input': {
                  color: '#020002',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#020002',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
            >
              <InputLabel>Categoria</InputLabel>
              <Select
                label="Categoria"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="" sx={{ color: 'black' }}><em>Nenhum</em></MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCreateModalOpen(true)}
              sx={{
                backgroundColor: '#8B0000',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#600000',
                },
                height: '50px',
                alignSelf: 'flex-end',
                mr: '40px',
                mb: '20px'
              }}
            >
              + ADICIONAR PRODUTO
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: 600, width: '97%' }}>
          <DataGrid
            rows={filteredProducts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.id_product}
            className="css-19lesmn-MuiDataGrid-root"
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#8B0000',
                color: '#f0f0f0'
              },
              '& .MuiCheckbox-root': {
                color: '#C62828',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#f0f0f0',
                color: '#020002',
              },
              '& .MuiDataGrid-scrollbarFiller--header': {
                backgroundColor: '#8B0000'
              },
            }}
          />
        </Box>
      </div>

      {/*MODAL DE EDIÇÃO*/}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <IconButton
            onClick={() => setEditModalOpen(false)}
            sx={{ alignSelf: 'flex-start', marginBottom: '20px' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: 'flex',
              alignSelf: 'center',
              position: 'absolute',
            }}
          >
            Editar Produto
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              alignSelf: 'flex-end',
              position: 'absolute',
            }}
          >
            ID: {editProduct.id_product}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: '0rem',
            }}
          >
            <TextField
              label="Nome"
              name="name"
              variant="outlined"
              value={editProduct.name}
              onChange={handleEditChange}
              sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: '4px',
                width: '48%',
                '& .MuiInputBase-input': {
                  color: '#020002',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#020002',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
            />
            <TextField
              label="Preço"
              name="price"
              variant="outlined"
              value={editProduct.price}
              onChange={handleEditChange}
              sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: '4px',
                width: '48%',
                '& .MuiInputBase-input': {
                  color: '#020002',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#020002',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '56px',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                border: '1px solid #020002',
                fontSize: '15px',
                borderRadius: '3px',
                padding: '1px 5px',
                backgroundColor: '#FDFDFD',
                color: '#0F0F0F',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                overflow: 'hidden',
                marginRight: '8px',
                flexGrow: 1,
                height: '56px',
              }}
            >
              {editProduct.imageProduct.replace('src/assets/product/', '') || 'Nenhum arquivo selecionado'}
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                fontSize: '12px',
                backgroundColor: '#C62828',
                color: '#FFF',
                borderRadius: '4px',
                height: '56px',
                width: '150px',
                marginLeft: '1rem'
              }}
            >
              Escolher Imagem
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const fileName = e.target.files[0]?.name || '';
                  handleEditChange({
                    target: {
                      name: 'imageProduct',
                      value: `src/assets/product/${fileName}`,
                    },
                  });
                }}
              />
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <FormControl
              variant="outlined"
              sx={{
                width: '48%',
                backgroundColor: '#F8F8F8',
                borderRadius: '4px',
                '& .MuiInputBase-input': {
                  color: '#020002',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#020002',
                  },
                  '&:hover fieldset': {
                    borderColor: 'red',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'black',
                  },
                },
              }}
            >
              <InputLabel>Categoria</InputLabel>
              <Select
                name="category"
                value={editProduct.category}
                onChange={handleEditChange}
                label="Categoria"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="availability"
                  checked={editProduct.availability}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      availability: e.target.checked,
                    })
                  }
                />
              }
              label="Disponibilidade"
              sx={{ width: '48%', margin: 0 }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignSelf: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{
                borderColor: '#C62828',
                color: '#C62828',
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'rgba(198, 40, 40, 0.1)' },
                mr: '15px',
              }}
              onClick={() => setEditModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveEdit}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*MODAL DE EXCLUSÃO*/}
      <Modal open={deleteModalOpen} onClose={() => {
        setDeleteModalOpen(false);
        setDeleteInput('');
        setDeleteError(false);
      }}>
        <Box
          sx={{
            padding: '2rem',
            backgroundColor: '#fff',
            margin: 'auto',
            marginTop: '10%',
            borderRadius: 1,
            boxShadow: 24,
            width: '36%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <IconButton onClick={() => {
            setDeleteModalOpen(false);
            setDeleteInput('');
            setDeleteError(false);
          }} sx={{ alignSelf: 'flex-start' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ alignSelf: 'center', position: 'absolute', color: '#cc0000' }}>ATENÇÃO!</Typography>
          <Typography variant="h6" gutterBottom sx={{ alignSelf: 'flex-start' }}>
            Confirmação de Exclusão:
            <Box component="span" sx={{ color: '#8B0000', ml: '5px' }}>
              "{productToDelete?.name}"
            </Box>
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ alignSelf: 'flex-start' }}>Para confirmar a exclusão, digite "EXCLUIR" no campo abaixo.</Typography>
          <TextField
            fullWidth
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value.toUpperCase())}
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#840404',
              marginBottom: '1rem',
              '& .MuiInputBase-input': {
                color: '#840404',
                textAlign: 'center',
                fontSize: 'large'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#020002',
                },
                '&:hover fieldset': {
                  borderColor: '#C62828',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#020002',
                },
              },
              width: '150px',
            }}
          />
          {deleteError && (
            <Typography color="error" gutterBottom>
              Texto incorreto. Digite "EXCLUIR" para confirmar.
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setDeleteModalOpen(false);
                setDeleteInput('');
                setDeleteError(false);
              }}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#8B0000',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDeleteConfirm}
              sx={{
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#600000',
                },
              }}
            >
              EXCLUIR
            </Button>
          </Box>
        </Box>
      </Modal>

{/* MODAL DE CRIAÇÃO DE PRODUTO */}
<Modal
  open={createModalOpen}
  onClose={() => {
    setCreateModalOpen(false);
    setNewProduct({ ...newProduct, imageProduct: '' });
  }}
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={() => {
        setCreateModalOpen(false);
        setNewProduct({ ...newProduct, imageProduct: '' });
      }} sx={{ alignSelf: 'flex-start', position: 'absolute' }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', mb: '10px' }}>
        Criar Novo Produto
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <TextField
        name="name"
        label="Nome"
        variant="outlined"
        value={newProduct.name}
        onChange={handleCreateChange}
        fullWidth
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          '& .MuiInputBase-input': {
            color: '#020002',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#020002',
            },
            '&:hover fieldset': {
              borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        }}
      />
      <TextField
        name="price"
        label="Preço"
        variant="outlined"
        type="number"
        value={newProduct.price}
        onChange={handleCreateChange}
        fullWidth
        sx={{
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
          '& .MuiInputBase-input': {
            color: '#020002',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#020002',
            },
            '&:hover fieldset': {
              borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        }}
      />
    </Box>

    {/* Exibição do nome da imagem */}
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      height: '56px',
      width: '100%'
    }}>
      <Typography
        variant="body1"
        sx={{
          border: '1px solid #020002',
          fontSize: '15px',
          borderRadius: '3px',
          padding: '1px 5px',
          backgroundColor: '#FDFDFD',
          color: '#0F0F0F',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          overflow: 'hidden',
          flexGrow: 1,
          height: '56px',
        }}
      >
        {newProduct.imageProduct || 'Nenhum arquivo selecionado'}
      </Typography>

      {/* Escolha de Imagem */}
      <Button
        variant="contained"
        component="label"
        sx={{
          fontSize: '12px',
          backgroundColor: '#C62828',
          color: '#FFF',
          borderRadius: '4px',
          marginRight: '8px',
          height: '56px',
          width: '150px',
          marginLeft: '1rem'
        }}
      >
        Escolher Imagem
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // Atualizando o estado para mostrar o nome do arquivo na UI
              setNewProduct((prev) => ({
                ...prev,
                imageProduct: file.name,
              }));
            }
          }}
        />
      </Button>
    </Box>

    <Box sx={{ display: 'flex', gap: '1rem' }}>
      <FormControl
        variant="outlined"
        fullWidth
        sx={{
          width: '259px',
          backgroundColor: '#FFF',
          borderRadius: '4px',
          '& .MuiInputBase-input': {
            color: '#020002',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#020002',
            },
            '&:hover fieldset': {
              borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
        }}
      >
        <InputLabel>Categoria</InputLabel>
        <Select
          name="category"
          value={newProduct.category}
          onChange={handleCreateChange}
          label="Categoria"
        >
          <MenuItem value="">
            <em>Selecione uma categoria</em>
          </MenuItem>
          {categories.map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={newProduct.availability}
            onChange={() => setNewProduct({ ...newProduct, availability: !newProduct.availability })}
          />
        }
        label="Disponível"
        sx={{ flexGrow: 1 }}
      />
    </Box>

    {/* Botões de ação */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', mt: 2 }}>
      <Button
        variant="contained"
        onClick={() => setCreateModalOpen(false)}
        sx={{
          backgroundColor: '#FFFFFF',
          color: '#8B0000',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateProduct}
        sx={{
          backgroundColor: '#C62828',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#600000',
          },
        }}
      >
        Adicionar
      </Button>
    </Box>
  </Box>
</Modal>






      <ButtonsPageTable />
    </>
  );
};

export default UpdateShowcase;