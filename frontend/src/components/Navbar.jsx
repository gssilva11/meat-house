import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Badge,
  useMediaQuery,
  Paper,
  Modal as MuiModal,
  Card,
  CardContent,
  Button,
  Typography as MuiTypography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../assets/logo/logo2.png';
import { Link } from 'react-router-dom';
import myfetch from '../utils/myfetch';
import VanillaTilt from 'vanilla-tilt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductModal from './ProductModal';
import Cart from './Cart.jsx'

const Tilt = ({ children }) => {
  const tiltRef = useRef();

  useEffect(() => {
    const tiltNode = tiltRef.current;
    VanillaTilt.init(tiltNode, {
      max: 2.5,
      speed: 500,
      glare: true,
      'max-glare': 0.1,
    });

    return () => {
      tiltNode.vanillaTilt.destroy();
    };
  }, []);

  return (
    <div ref={tiltRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};

const Navbar = ({ cartItemCount, setCartItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const inputRef = useRef(null); // Ref to access the input element
  const resultsRef = useRef(null); // Ref to access the search results list

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCartToggle = () => {
    setCartOpen(!cartOpen);
  };

  const handleSearchChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const results = await myfetch.search('product/search', value);
        setSearchResults(results);
        setShowSearchResults(true); // Show the search results when there are results
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false); // Hide the search results if no input
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchResults([]); // Clear the search results
    setShowSearchResults(false); // Hide the search results
    setModalOpen(true);
    setSearchTerm(''); // Clear the input field
  };

  const handleSearchResultSelect = (product) => {
    setSelectedProduct(product);
    setSearchResults([]); // Clear the search results
    setShowSearchResults(false); // Hide the search results
    setModalOpen(true);
  };

  const handleOpenProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleBlur = () => {
    // Set a timeout to allow click events to register before hiding the results
    setTimeout(() => {
      setShowSearchResults(false);
    }, 200);
  };

  const handleFocus = () => {
    setShowSearchResults(true);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#060202' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ color: '#8B0000', marginRight: '10px' }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Casa de Carnes Logo" style={{ height: '50px', marginRight: '10px' }} />
              </Link>
            </div>
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            {!isMobile && (
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <InputBase
                  placeholder="Buscar produto..."
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={handleBlur} // Clear the input field and hide the search results when it loses focus
                  onFocus={handleFocus} // Show the search results when the input is focused
                  ref={inputRef} // Attach the ref
                  sx={{
                    color: 'white',
                    marginRight: '10px',
                    backgroundColor: '#8B0000',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    opacity: '90%',
                  }}
                />
                <IconButton type="submit" aria-label="search" sx={{ color: '#8B0000' }}>
                  <SearchIcon />
                </IconButton>
              </form>
            )}
            <IconButton aria-label="cart" sx={{ color: '#8B0000', marginLeft: '20px' }} onClick={() => {<Cart/>}}>
              <Badge badgeContent={cartItemCount} color="error"> 
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {showSearchResults && searchResults.length > 0 && (
              <Paper sx={{ position: 'absolute', top: '40px', left: '0', right: '0', zIndex: 1, maxHeight: '200px', overflowY: 'auto' }}>
                <List ref={resultsRef}>
                  {searchResults.map((product) => (
                    <ListItem
                      key={product.id_product}
                      button
                      onClick={() => handleSearchResultSelect(product)}
                    >
                      <ListItemText primary={product.name} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? '250px' : drawerOpen ? '200px' : '60px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? '250px' : drawerOpen ? '200px' : '60px',
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/lsu" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/vitrine" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Vitrine" />
            </ListItem>
            <ListItem button component={Link} to="/requests" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Pedidos recebidos" />
            </ListItem>
            <ListItem button component={Link} to="/profile/10" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
            {/* <ListItem button component={Link} to="/requests" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Pedidos recebidos" />
            </ListItem> */}
          </List>
        </Box>
      </Drawer>
      <MuiModal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '80%' : 900,
          height: isMobile ? 'auto' : 450,
          bgcolor: 'background.paper',
          border: '2px solid #C62828',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleCloseModal} sx={{ color: '#C62828' }}>
              <ArrowBackIcon />
            </IconButton>
            <MuiTypography variant="h6" gutterBottom sx={{ ml: 1 }}>Resultados da Busca</MuiTypography>
          </Box>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', width: '100%', overflowY: 'auto', maxHeight: '70vh' }}>
            {searchResults.map((product) => (
              <Tilt key={product.id_product}>
                <Card
                  sx={{
                    width: '200px',
                    height: '275px',
                    backgroundColor: '#010203',
                    border: '1px solid #33363d',
                    boxShadow: '1px 2px 3.5px #121212',
                  }}
                >
                  <div style={{ position: 'relative', padding: '16px' }}>
                    <MuiTypography variant="h6" sx={{ color: '#f0f0f0' }}>{product.name}</MuiTypography>
                  </div>
                  <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                      src={product.imageProduct}
                      alt={product.name}
                      loading="lazy"
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '11px 0 11px 0' }}
                    />
                  </div>
                  <CardContent style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <MuiTypography sx={{ color: '#f0f0f0' }} variant="body2">Preço (Kg):</MuiTypography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <MuiTypography sx={{ color: '#f0f0f0' }} variant="h6" >
                          R${product.price}
                        </MuiTypography>
                        <Button
                          variant="contained"
                          color="warning"
                          aria-label="Adicionar ao carrinho"
                          sx={{ fontWeight: 600 }}
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCartIcon />
                        </Button>
                      </Box>
                    </div>
                  </CardContent>
                </Card>
              </Tilt>
            ))}
          </div>
        </Box>
      </MuiModal>
      {selectedProduct && (
        <ProductModal
          open={modalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
          onAddToCart={addToCart}
        />
      )}
    </>
  );
};

export default Navbar;
