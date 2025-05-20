import React, { useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Box,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Movie, AccountCircle, ExitToApp } from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Movie sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              color: 'inherit', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            CinePlus
          </Typography>
        </Box>

        {user ? (
          <Box>
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin"
                sx={{ mr: 2 }}
              >
                Admin Panel
              </Button>
            )}
            <IconButton
              color="inherit"
              component={Link}
              to="/profile"
              sx={{ mr: 1 }}
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLogout}
            >
              <ExitToApp />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button 
              color="secondary" 
              variant="contained" 
              component={Link} 
              to="/register"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;