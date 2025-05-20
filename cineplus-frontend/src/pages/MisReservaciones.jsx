import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { getReservacionesByUser } from '../api/reservaciones';

const MisReservacionesPage = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const data = await getReservacionesByUser();
        setReservaciones(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener reservaciones:', error);
        setLoading(false);
      }
    };
    fetchReservaciones();
  }, []);

  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Mis Reservaciones</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Película</TableCell>
              <TableCell>Sala</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Asientos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservaciones.map((reservacion) => (
              <TableRow key={reservacion.id}>
                <TableCell>{reservacion.pelicula}</TableCell>
                <TableCell>{reservacion.sala_nombre}</TableCell>
                <TableCell>{new Date(reservacion.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{JSON.parse(reservacion.asientos).map(s => s + 1).join(', ')}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    size="small"
                    href={`${process.env.REACT_APP_API_URL}/reservaciones/${reservacion.id}/qr`}
                    target="_blank"
                  >
                    Ver QR
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {reservaciones.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No tienes reservaciones aún.
        </Typography>
      )}
    </Container>
  );
};

export default MisReservacionesPage;