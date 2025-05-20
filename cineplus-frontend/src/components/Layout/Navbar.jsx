import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { Movie, Theaters, People, ConfirmationNumber, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/mi-perfil');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        {/* Logo y título */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Theaters sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              color: 'inherit', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            CinePlus
          </Typography>
        </Box>

        {/* Menú principal */}
        <Box sx={{ flexGrow: 1, display: 'flex', ml: 3 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/salas"
            startIcon={<Movie />}
            sx={{ mr: 1 }}
          >
            Cartelera
          </Button>

          {user && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/mis-reservaciones"
              startIcon={<ConfirmationNumber />}
              sx={{ mr: 1 }}
            >
              Mis Reservas
            </Button>
          )}

          {user?.role === 'admin' && (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin/salas"
                startIcon={<Movie />}
                sx={{ mr: 1 }}
              >
                Administrar Salas
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin/usuarios"
                startIcon={<People />}
                sx={{ mr: 1 }}
              >
                Administrar Usuarios
              </Button>
            </>
          )}
        </Box>

        {/* Menú de usuario */}
        {user ? (
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user.avatar ? (
                <Avatar src={user.avatar} alt={user.username} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Mi Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
              {user.role === 'admin' && (
                <MenuItem 
                  component={Link} 
                  to="/admin"
                  onClick={handleClose}
                >
                  Panel de Administración
                </MenuItem>
              )}
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ mr: 1 }}
            >
              Iniciar Sesión
            </Button>
            <Button 
              color="secondary" 
              variant="contained" 
              component={Link} 
              to="/register"
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'secondary.dark'
                }
              }}
            >
              Registrarse
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;