// src/components/Salas/SalaCard.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const SalaCard = ({ sala }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={sala.imagen_poster || 'https://via.placeholder.com/300x450'}
        alt={sala.pelicula}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {sala.pelicula}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sala: {sala.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Capacidad: {sala.filas * sala.columnas} asientos
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          component={Link} 
          to={`/butacas/${sala.id}`}
        >
          Reservar
        </Button>
      </CardActions>
    </Card>
  );
};

export default SalaCard;