import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import TopBar from './components/TopBar';
import FooterBar from './components/FooterBar';

import CompraFinalizada from './pages/CompraFinalizada';
import HomePage from './pages/HomePage';
import FinalizandoCompra from './pages/FinalizandoCompra';
import LoginSingUp from './pages/LoginSingUp';
import Requests from './pages/Requests';
import UpdateShowcase from './pages/UpdateShowcase.jsx';
import ProfilePage from './pages/Profile.jsx';
import History from './components/History.jsx'
import Category from './pages/Category.jsx'
import Cut from './pages/Cut.jsx'


function App() {
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Box>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cf" element={<CompraFinalizada />} />
            <Route path="/fc" element={<FinalizandoCompra />} />
            <Route path="/lsu" element={<LoginSingUp />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/vitrine" element={<UpdateShowcase />} />
            <Route path="/class" element={<Category />} />
            <Route path="/cut" element={<Cut />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/history/:id" element={<History />} />

          </Routes>
        </Box>
        <FooterBar />
      </BrowserRouter>
    </>
  );
}

export default App;
