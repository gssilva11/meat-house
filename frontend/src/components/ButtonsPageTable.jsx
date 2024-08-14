import React, { useRef, useEffect } from 'react';
import { Button, Box, Tooltip, Typography } from '@mui/material';
import { BsUiChecksGrid } from "react-icons/bs";
import { LuBeef } from "react-icons/lu";
import { PiKnife } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';

const NavigationButtons = () => {
  const navigate = useNavigate();

  const buttonRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    buttonRefs.forEach(ref => {
      if (ref.current) {
        VanillaTilt.init(ref.current, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.1,
        });
      }
    });

    return () => {
      buttonRefs.forEach(ref => {
        if (ref.current?.vanillaTilt) {
          ref.current.vanillaTilt.destroy();
        }
      });
    };
  }, [buttonRefs]);

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const buttonContainerStyle = {
    position: 'fixed',
    right: '16px',
    bottom: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    zIndex: 1000,
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    minWidth: 'auto',
    padding: 0,
    margin: '4px 0',
    border: 'none',
  };

  const tooltipTextStyle = {
    fontSize: '18px',
  };

  return (
    <Box sx={buttonContainerStyle}>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Produtos</Typography>} arrow placement="left">
        <div ref={buttonRefs[0]} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('/vitrine')}
          >
            <LuBeef fontSize='30px' />
          </Button>
        </div>
      </Tooltip>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Categorias</Typography>} arrow placement="left">
        <div ref={buttonRefs[1]} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('/category')}
          >
            <BsUiChecksGrid fontSize='30px' />
          </Button>
        </div>
      </Tooltip>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Tipos de Corte</Typography>} arrow placement="left">
        <div ref={buttonRefs[2]} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('/cut')}
          >
            <PiKnife fontSize='30px'  />
          </Button>
        </div>
      </Tooltip>
    </Box>
  );
};

export default NavigationButtons;
