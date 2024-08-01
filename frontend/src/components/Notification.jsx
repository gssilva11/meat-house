// Notification.jsx

// import React, { useState } from 'react';
// import { Snackbar, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const Notification = ({ message, severity, onClose }) => {
//   const [open, setOpen] = useState(true);

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//     onClose(); // Chama a função para fechar a notificação no componente pai
//   };

//   return (
//     <Snackbar
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={open}
//       autoHideDuration={6000}
//       onClose={handleClose}
//       message={message}
//       action={
//         <IconButton size="small" aria-label="fechar" color="inherit" onClick={handleClose}>
//           <CloseIcon fontSize="small" />
//         </IconButton>
//       }
//       severity={severity} // Adicione sua lógica para diferentes severidades se necessário
//     />
//   );
// };

// export default Notification;



// // src/components/Notification.jsx
// import React from 'react';
// import { Snackbar, Alert } from '@mui/material';

// const Notification = ({ open, handleClose, message, severity }) => {
//   return (
//     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
//         {message}
//       </Alert>
//     </Snackbar>
//   );
// };

// export default Notification;

// src/components/Notification.jsx
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (message) => {
  toast.error(message);
};

const Notification = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar
      closeOnClick
      pauseOnHover
      draggable
    />
  );
};

export default Notification;