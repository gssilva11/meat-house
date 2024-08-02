import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import promocao1 from '../assets/banner/1.jpg';
import promocao2 from '../assets/banner/2.jpg';
import promocao3 from '../assets/banner/3.jpg';
import promocao4 from '../assets/banner/4.jpg';

const images = [promocao1, promocao2, promocao3, promocao4];

const Banner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        height: { xs: '100px', sm: '150px', md: '200px' },
        }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          left: 0,
          color: '#fff',
          zIndex: 1,
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        component="img"
        src={images[currentImageIndex]}
        alt="Promoções do dia"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 1s ease-in-out',
          opacity: 1,
        }}
      />
      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          color: '#fff',
          zIndex: 1,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          display: 'flex',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '10px',
              height: '5px',
              backgroundColor: index === currentImageIndex ? 'red' : 'white',
              borderRadius: '2px',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Banner;
