import React from 'react';
import { Box, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import Dinheiro from '../assets/logo/dinheiro.png'
import Pix from '../assets/logo/pix.png'
import Visa from '../assets/logo/visa.png'
import Mastercard from '../assets/logo/mastercard.png'
import Elo from '../assets/logo/elo.png'
import Hipercard from '../assets/logo/hipercard.png'


const FooterBar = () => {
  return (
    <Box sx={{ width: '100%', color: 'var(--color-neutral-40)', backgroundColor: '#8B0000', mt: "200px" }}>
      <Grid container id="footer_content" sx={{ justifyContent: "space-between", margin: '0px', padding: '10px 10px 0 40px' }}>
        <Grid item xs={12} sm={4} md={3} id="footer_contacts">
          <Typography variant="h6" mb={1} sx={{ color: '#fff' }}>Contacts:</Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>Rua:____________________</Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>Cidade:__, Estado__, N°__</Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>Email: info@meatshop.com</Typography>
          <Typography variant="body2" sx={{ color: '#fff', mb: '10px' }}>Phone: (123) 456-7890</Typography>
        </Grid>

        <Grid md={3} sx={{ display: 'flex' }}>
          <Typography variant="h6" sx={{ color: '#fff', position: 'absolute' }}>Aceitamos:</Typography>
          <Box component="ul" sx={{ padding: 0, listStyle: 'none', alignSelf: "center", mt: '40px' }}>
            <li>
              <Link>
                <img src={Dinheiro} alt="Dinheiro" style={{ height: '30px', marginRight: '10px' }} />
              </Link>
            </li>
            <li>
              <Link>
                <img src={Pix} alt="Pix" style={{ height: '30px', marginRight: '10px' }} />
              </Link>
            </li>
          </Box>
          <Box component="ul" sx={{ padding: 0, listStyle: 'none', alignSelf: "center", mt: '40px' }}>
            <li>
              <Link>
                <img src={Mastercard} alt="Mastercard" style={{ height: '30px', marginRight: '10px' }} />
              </Link>
            </li>
            <li>
              <Link>
                <img src={Elo} alt="Elo" style={{ height: '30px', marginRight: '10px' }} />
              </Link>
            </li>
          </Box>
          <Box component="ul" sx={{ padding: 0, listStyle: 'none', alignSelf: "center", mt: '40px' }}>
            <li>
              <Link>
                <img src={Visa} alt="Visa" style={{ height: '30px', marginRight: '10px' }} />
              </Link>
            </li>
            <li>
              <Link>
                <img src={Hipercard} alt="Hipercard" style={{ height: '30px', marginRight: '10px' }} />
              </Link></li>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={3} mb='20px'>
          <Typography variant="h6" mb={1} sx={{ color: '#fff' }}>Follow Us:</Typography>
          <Box id="footer_social_media" sx={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <IconButton href="https://www.instagram.com/" id="instagram" target=" _blank" sx={{ background: 'linear-gradient(#7f37c9, #ff2992, #ff9807)', color: '#fff', borderRadius: '50%', '&:hover': { opacity: 0.8 } }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://www.facebook.com/" id="facebook" target=" _blank" sx={{ backgroundColor: '#4267b3', color: '#fff', borderRadius: '50%', '&:hover': { opacity: 0.8 } }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://www.whatsapp.com/" id="whatsapp" target=" _blank" sx={{ backgroundColor: '#25d366', color: '#fff', borderRadius: '50%', '&:hover': { opacity: 0.8 } }}>
              <WhatsApp />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ color: '#f0f0f0', display: 'flex', justifyContent: 'center', backgroundColor: 'black', pb: '2px', pt: '2px', fontWeight: 100 }}>
        <Typography variant="body2">© 2024 Meat Shop. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default FooterBar;
