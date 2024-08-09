import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  IconButton,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductTable = ({ products, handleEditClick, handleDeleteClick, filterName, filterClass }) => {
  const filteredProducts = products.filter(product =>
    (product.name?.toLowerCase().includes(filterName.toLowerCase())) &&
    (product.class?.class?.toLowerCase().includes(filterClass.toLowerCase()))
  );

  const columns = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'price', headerName: 'Preço (R$)', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'weight', headerName: 'Peso (g)', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'class', headerName: 'Classe', flex: 1, align: 'center', headerAlign: 'center', valueGetter: (params) => params.row.class.class },
    {
      field: 'availability',
      headerName: 'Disponibilidade',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Checkbox checked={params.value} />
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
    <div style={{ height: 600, width: '100%' }}>
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
    </div>
  );
};

export default ProductTable;
