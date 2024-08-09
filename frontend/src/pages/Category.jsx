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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import myfetch from '../utils/myfetch';
import Navbar from '../components/Navbar';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [editCategory, setEditCategory] = useState({
    class: ''
  });
  const [newCategory, setNewCategory] = useState({
    class: ''
  });

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

  const handleEditClick = async (category) => {
    try {
      const data = await myfetch.get(`class/${category.class}`);
      setEditCategory(data);
      setEditModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditCategory({ ...editCategory, [name]: value });
  };

  const handleSaveEdit = async () => {
    try {
      await myfetch.put(`class/${editCategory.class}`, editCategory);
      reloadCategories();
      setEditModalOpen(false);
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
      setNewCategory({
        class: ''
      });
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

  const columns = [
    { field: 'class', headerName: 'Class', flex: 1 },
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
          <Typography variant="h4" align="left" gutterBottom>Categorias</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
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
            rows={categories}
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

      {/* MODAL DE EDIÇÃO */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
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
          <IconButton onClick={() => setEditModalOpen(false)} sx={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignSelf: 'center', position: 'absolute' }}>Editar Categoria</Typography>
          <Typography variant="body1" gutterBottom sx={{ alignSelf: 'flex-end', position: 'absolute' }}>Class: {editCategory.class}</Typography>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <TextField
              label="Class"
              name="class"
              variant="outlined"
              value={editCategory.class}
              onChange={handleEditChange}
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
              onClick={() => setEditModalOpen(false)}
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
              onClick={handleSaveEdit}
              sx={{
                backgroundColor: '#C62828',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#600000',
                },
              }}
            >
              Salvar
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
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>Excluir Categoria</Typography>
          <Typography variant="body1" gutterBottom>Digite "EXCLUIR" para confirmar.</Typography>
          <TextField
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            error={deleteError}
            helperText={deleteError ? 'Digite "EXCLUIR" corretamente para excluir.' : ''}
            fullWidth
            sx={{
              marginBottom: '1rem',
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
          />
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
              Excluir
            </Button>
          </Box>
        </Box>
      </Modal>

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
            width: '36%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>Adicionar Categoria</Typography>
          <TextField
            label="Class"
            name="class"
            variant="outlined"
            value={newCategory.class}
            onChange={handleCreateChange}
            fullWidth
            sx={{
              marginBottom: '1rem',
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
          />
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
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Category;
