import React, { useState } from 'react';
import { Toolbar, Button, Box, Typography, Divider, useMediaQuery, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const TopBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [openModal, setOpenModal] = useState(null);

  const handleOpen = (modal) => () => setOpenModal(modal);
  const handleClose = () => setOpenModal(null);

  return (
    <div sx={{ flexWrap: 'wrap' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '5px' : '20px',
          justifyContent: isMobile ? 'center' : 'end',
          height: '30px',
          paddingRight: isMobile ? '5px' : '18px',
          backgroundColor: '#8B0000',
        }}
      >
        <Button onClick={handleOpen('endereco')} sx={{ color: '#fff', padding: '5px', minHeight: '14px' }}>
          Endereço
        </Button>
        {!isMobile && (
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff', height: '15px', marginTop: '7px' }} />
        )}
        <Button onClick={handleOpen('contato')} sx={{ color: '#fff', padding: '5px', minHeight: '14px' }}>
          Contato
        </Button>
        {!isMobile && (
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff', height: '15px', marginTop: '7px' }} />
        )}
        <Button onClick={handleOpen('sobreNos')} sx={{ color: '#fff', padding: '5px', minHeight: '14px' }}>
          Sobre Nós
        </Button>
        {!isMobile && (
          <Divider orientation="vertical" flexItem sx={{ backgroundColor: '#fff', height: '15px', marginTop: '7px' }} />
        )}
        <Button sx={{ color: '#fff', padding: '5px', minHeight: '14px' }} component={Link} to="/lsu">
          Entre
        </Button>
      </Box>

      <Modal open={openModal === 'endereco'} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#8B0000' }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ color: '#8B0000', marginBottom: 2 }}>
            Endereço
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Rua Exemplo, 123 - Bairro - Cidade, Estado
          </Typography>
        </Box>
      </Modal>

      <Modal open={openModal === 'contato'} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#8B0000' }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ color: '#8B0000', marginBottom: 2 }}>
            Contato
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Telefone: (11) 1234-5678<br />
            Email: contato@exemplo.com
          </Typography>
        </Box>
      </Modal>

      <Modal open={openModal === 'sobreNos'} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8, color: '#8B0000' }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2" sx={{ color: '#8B0000', marginBottom: 2 }}>
            Sobre Nós
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Somos uma casa de carnes especializada em produtos de alta qualidade, oferecendo uma variedade de cortes para todos os gostos.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TopBar;
