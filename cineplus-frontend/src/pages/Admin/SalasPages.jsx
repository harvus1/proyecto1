// src/pages/Admin/SalasPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getSalas, deleteSala } from '../../api/salas';
import { AuthContext } from '../../context/AuthContext';
import { 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import SalaCard from '../../components/Salas/SalaCard';

const SalasPage = () => {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salaToDelete, setSalaToDelete] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const data = await getSalas();
        setSalas(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener salas:', error);
        setLoading(false);
      }
    };
    fetchSalas();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteSala(salaToDelete.id);
      setSalas(salas.filter(s => s.id !== salaToDelete.id));
      setSalaToDelete(null);
    } catch (error) {
      console.error('Error al eliminar sala:', error);
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (user?.role !== 'admin') return <Typography>No tienes permisos para acceder a esta página</Typography>;

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Administración de Salas</Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />}
          component={Link}
          to="/admin/salas/nueva"
        >
          Nueva Sala
        </Button>
      </Box>

      <Grid container spacing={3}>
        {salas.map(sala => (
          <Grid item key={sala.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">{sala.pelicula}</Typography>
                <Typography>Sala: {sala.nombre}</Typography>
                <Typography>Capacidad: {sala.filas * sala.columnas} asientos</Typography>
              </CardContent>
              <CardActions>
                <IconButton 
                  component={Link}
                  to={`/admin/salas/editar/${sala.id}`}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                <IconButton 
                  color="error"
                  onClick={() => setSalaToDelete(sala)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!salaToDelete} onClose={() => setSalaToDelete(null)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar la sala "{salaToDelete?.nombre}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSalaToDelete(null)}>Cancelar</Button>
          <Button onClick={handleDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SalasPage;