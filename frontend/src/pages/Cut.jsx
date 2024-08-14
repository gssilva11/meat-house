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
import ButtonsPageTable from '../components/ButtonsPageTable.jsx';

const CuttingType = () => {
  const [cuttingTypes, setCuttingTypes] = useState([]);
  const [filteredCuttingTypes, setFilteredCuttingTypes] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [cuttingTypeToDelete, setCuttingTypeToDelete] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [deleteError, setDeleteError] = useState(false);
  const [editCuttingType, setEditCuttingType] = useState({
    id_cuttingType: '',
    cuttingType: ''
  });
  const [newCuttingType, setNewCuttingType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCuttingTypes = async () => {
      try {
        const data = await myfetch.get('cuttingType');
        setCuttingTypes(data);
        setFilteredCuttingTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCuttingTypes();
  }, []);

  useEffect(() => {
    const filtered = cuttingTypes.filter(ct =>
      ct.cuttingType.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCuttingTypes(filtered);
  }, [searchTerm, cuttingTypes]);

  const reloadCuttingTypes = async () => {
    try {
      const data = await myfetch.get('cuttingType');
      setCuttingTypes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (cuttingType) => {
    setEditCuttingType(cuttingType);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await myfetch.put(`cuttingType/${editCuttingType.id_cuttingType}`, editCuttingType);
      reloadCuttingTypes();
      setEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (cuttingType) => {
    setCuttingTypeToDelete(cuttingType);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteInput === 'EXCLUIR') {
      try {
        await myfetch.delete(`cuttingType/${cuttingTypeToDelete.id_cuttingType}`);
        reloadCuttingTypes();
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

  const handleCreateChange = (e) => setNewCuttingType(e.target.value);

  const handleCreateCuttingType = async () => {
    try {
      await myfetch.post('cuttingType', { cuttingType: newCuttingType });
      reloadCuttingTypes();
      setCreateModalOpen(false);
      setNewCuttingType('');
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'cuttingType', headerName: 'Tipo de Corte', flex: 1 },
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
          <Typography variant="h4" align="left" gutterBottom>Tipos de Corte</Typography>
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
              + ADICIONAR TIPO DE CORTE
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 600, width: '97%' }}>
          <DataGrid
            rows={filteredCuttingTypes}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.id_cuttingType}
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
            }}
          />
        </Box>
      </div>

      <ButtonsPageTable />

      {/* MODAL DE EDIÇÃO */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setEditModalOpen(false)} sx={{ alignSelf: 'flex-start', position: 'absolute' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', mb: '10px' }}>
              Editar Tipo de Corte
            </Typography>
          </Box>
          <TextField
            name="cuttingType"
            label="Tipo de Corte"
            variant="outlined"
            value={editCuttingType.cuttingType}
            onChange={(e) => setEditCuttingType({ ...editCuttingType, cuttingType: e.target.value })}
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
              "{cuttingTypeToDelete?.cuttingType}"
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

      {/* MODAL DE CRIAÇÃO */}
      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => setCreateModalOpen(false)} sx={{ alignSelf: 'flex-start', position: 'absolute' }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', mb: '10px' }}>
              Criar Novo Tipo de Corte
            </Typography>
          </Box>
          <TextField
            name="cuttingType"
            label="Tipo de Corte"
            variant="outlined"
            value={newCuttingType}
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
              onClick={handleCreateCuttingType}
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

export default CuttingType;
