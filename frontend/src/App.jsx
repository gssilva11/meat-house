import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import TopBar from './components/TopBar.jsx';
import FooterBar from './components/FooterBar.jsx';
import Notification from './components/Notification.jsx'; // Adicionar o Notification

import CompraFinalizada from './pages/CompraFinalizada.jsx';
import HomePage from './pages/HomePage.jsx';
import FinalizandoCompra from './pages/FinalizandoCompra.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/Signup.jsx';
import Requests from './pages/Requests.jsx';
import UpdateShowcase from './pages/UpdateShowcase.jsx';
import ProfilePage from './pages/Profile.jsx';
import History from './components/History.jsx';
import Category from './pages/Category.jsx';
import Cut from './pages/Cut.jsx';
import OrderCheckout from './pages/OrderCheckout.jsx';
import OrderTracking from './pages/OrderTracking.jsx';

function App() {
  return (
    <Router>
      <Notification /> {/* Colocar o Notification para exibição global */}
      <TopBar />
      <Box sx={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cf" element={<CompraFinalizada />} />
          <Route path="/fc" element={<FinalizandoCompra />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/vitrine" element={<UpdateShowcase />} />
          <Route path="/cut" element={<Cut />} />
          <Route path="/category" element={<Category />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/history/:id" element={<History />} />
          <Route path="/checkout" element={<OrderCheckout />} />
          <Route path="/orderTracking" element={<OrderTracking />} />

        </Routes>
      </Box>
      <FooterBar />
    </Router>
  );
}

export default App;
