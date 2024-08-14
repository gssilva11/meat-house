import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import myfetch from '../utils/myfetch';
import Navbar from '../components/Navbar';
import ButtonsPageTable from '../components/ButtonsPageTable.jsx';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [newCategory, setNewCategory] = useState({ class: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await myfetch.get('class');
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const reloadCategories = async () => {
    try {
      const data = await myfetch.get('class');
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleCreateCategory = async () => {
    try {
      const data = await myfetch.post('class', newCategory);
      setCategories([...categories, data]);
      setCreateModalOpen(false);
      setNewCategory({ class: '' });
      reloadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteInput === 'EXCLUIR') {
      try {
        await myfetch.delete(`class/${categoryToDelete.class}`);
        await reloadCategories();
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

  const filteredCategories = categories.filter((category) =>
    category.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'class', headerName: 'Categoria', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <>
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
          <Typography variant="h4" align="left" gutterBottom>Categorias</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
          <Box>
            <TextField
              label="Buscar por nome"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                    borderColor: '#C62828',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#020002',
                  },
                },
                mr: '15px'
              }}
            />
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
              + ADICIONAR CATEGORIA
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 600, width: '97%' }}>
          <DataGrid
            rows={filteredCategories}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.class}
            className="css-19lesmn-MuiDataGrid-root"
            sx={{
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#8B0000',
                color: '#f0f0f0'
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

      {/* MODAL DE CRIAÇÃO */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Box
          sx={{
            padding: '2rem',
            backgroundColor: '#fff',
            margin: 'auto',
            marginTop: '10%',
            borderRadius: 1,
            boxShadow: 24,
            width: '700px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <IconButton onClick={() => setCreateModalOpen(false)} sx={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignSelf: 'center', position: 'absolute' }}>Criar Nova Categoria</Typography>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <TextField
              label="Class"
              name="class"
              variant="outlined"
              value={newCategory.class}
              onChange={handleCreateChange}
              sx={{
                backgroundColor: '#F8F8F8',
                borderRadius: '4px',
                width: '100%',
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
              onClick={handleCreateCategory}
              sx={{
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#600000',
                },
              }}
            >
              Criar
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* MODAL DE EXCLUSÃO */}
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
          <Typography variant="h6" gutterBottom sx={{ alignSelf: 'center', position: 'absolute', color: '#cc0000' }}>
            ATENÇÃO!
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ alignSelf: 'flex-start' }}>
            Confirmação de Exclusão:
            <Box component="span" sx={{ color: '#8B0000', ml: '5px' }}>
              "{categoryToDelete?.class}"
            </Box>
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ alignSelf: 'flex-start' }}>
            Para confirmar a exclusão, digite "EXCLUIR" no campo abaixo.
          </Typography>
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
      <ButtonsPageTable />
    </>
  );
};

export default Category;
