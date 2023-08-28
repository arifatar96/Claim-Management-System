// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Replace "Your App Name" with your actual app name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">About</Button>
        <Button color="inherit">Contact</Button>
        {/* You can add more navigation buttons as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
