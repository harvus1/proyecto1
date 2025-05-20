import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white' }}>
      <Typography align="center">© 2023 CinePlus</Typography>
    </Box>
  );
};

export default Footer;