import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Sean Slab", serif',
  },
  palette: {
    primary: {
      main: '#C62828', // Vermelho Carne
    },
    secondary: {
      main: '#8D6E63', // Marrom
    },
    tertiary: {
      main: '#272727'
    },
    accent: {
      main: '#FFD54F', // Amarelo
    },
    background: {
      default: '#020002', // Preto
      paper: '#F5F5F5', // Cinza Claro
    },
    error: {
      main: '#D32F2F', // Vermelho
    },
    text: {
      primary: '#212121', // Preto
      secondary: '#757575', // Cinza Médio
    },
    input: {
      lsuOn: '#FFD54F', // Amarelo
      lsuOff: '#2196F3', // Azul
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',    // Passar o mouse
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',    // Clicado
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c0c0c0',  // Default
          },
        },
        input: {
          color: '#f0f0f0',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'Black', // Cor do label ao focar
          },
        },
      },
    },
  },
});

export default theme;
