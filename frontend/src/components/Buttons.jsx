import React, { useRef, useEffect, useState } from 'react';
import { Button, Box, Tooltip, Typography } from '@mui/material';
import { GiCow, GiPig, GiChicken } from 'react-icons/gi';
import VanillaTilt from 'vanilla-tilt';

const Buttons = ({ onExpandCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const bovinoRef = useRef(null);
  const suinoRef = useRef(null);
  const frangoRef = useRef(null);

  useEffect(() => {
    const tiltElements = [bovinoRef.current, suinoRef.current, frangoRef.current];

    tiltElements.forEach(element => {
      if (element) {
        VanillaTilt.init(element, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.1,
        });
      }
    });

    return () => {
      tiltElements.forEach(element => {
        if (element?.vanillaTilt) {
          element.vanillaTilt.destroy();
        }
      });
    };
  }, []);

  const handleButtonClick = (category) => {
    setSelectedCategory(category);
    onExpandCategory(category);
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

  const iconStyle = {
    fontSize: '40px',
  };

  const tooltipTextStyle = {
    fontSize: '18px',
  };

  return (
    <Box sx={buttonContainerStyle}>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Bovino</Typography>} arrow placement="left">
        <div ref={bovinoRef} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('Bovino')}
          >
            <GiCow style={iconStyle} />
          </Button>
        </div>
      </Tooltip>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Suíno</Typography>} arrow placement="left">
        <div ref={suinoRef} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('Suíno')}
          >
            <GiPig style={iconStyle} />
          </Button>
        </div>
      </Tooltip>
      <Tooltip title={<Typography sx={tooltipTextStyle}>Frango</Typography>} arrow placement="left">
        <div ref={frangoRef} style={{ display: 'inline-block' }}>
          <Button
            variant="contained"
            sx={buttonStyle}
            onClick={() => handleButtonClick('Frango')}
          >
            <GiChicken style={iconStyle} />
          </Button>
        </div>
      </Tooltip>
    </Box>
  );
};

export default Buttons;
