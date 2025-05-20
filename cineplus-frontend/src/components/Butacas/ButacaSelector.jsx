import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { getAsientos } from '../../api/salas';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { getAsientos, createReservacion } from '../../api/reservaciones';
import PagoModal from './PagoModal';
import QRModal from './QRModal';

const ButacaSelector = ({ salaId, salaInfo }) => {
  const [asientosReservados, setAsientosReservados] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [pagoOpen, setPagoOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [reservacionId, setReservacionId] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const fetchAsientos = async () => {
        try {
          const data = await getAsientos(salaId, selectedDate);
          setAsientosReservados(data.asientosReservados);
        } catch (error) {
          console.error('Error al obtener asientos:', error);
        }
      };
      fetchAsientos();
    }
  }, [salaId, selectedDate]);

  const handleSeatClick = (seatId) => {
    if (asientosReservados.includes(seatId)) return;

    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const handlePagoConfirm = async (cardData) => {
    try {
      const reservacion = await createReservacion({
        sala_id: salaId,
        fecha: selectedDate,
        asientos: selectedSeats
      });
      
      setReservacionId(reservacion.reservacionId);
      setPagoOpen(false);
      setQrOpen(true);
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error al crear reservación:', error);
    }
  };

  const getSeatColor = (seatId) => {
    if (asientosReservados.includes(seatId)) return 'error.main';
    if (selectedSeats.includes(seatId)) return 'success.main';
    return 'primary.main';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Selección de Butacas</Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Sala: {salaInfo.nombre}</Typography>
        <Typography variant="h6">Película: {salaInfo.pelicula}</Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Selecciona una fecha:</Typography>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
        />
      </Box>

      {selectedDate && (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[...Array(salaInfo.filas * salaInfo.columnas).keys()].map((seat) => (
              <Grid item key={seat} xs={1}>
                <Button
                  variant="contained"
                  sx={{ 
                    minWidth: 0, 
                    width: '100%', 
                    height: 40,
                    bgcolor: getSeatColor(seat),
                    '&:hover': {
                      bgcolor: getSeatColor(seat)
                    }
                  }}
                  onClick={() => handleSeatClick(seat)}
                  disabled={asientosReservados.includes(seat)}
                >
                  {seat + 1}
                </Button>
              </Grid>
            ))}
          </Grid>

          {selectedSeats.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Butacas seleccionadas: {selectedSeats.map(s => s + 1).join(', ')}
              </Typography>
              <Typography variant="h6">
                Total: ${selectedSeats.length * 8} (${8} por butaca)
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => setPagoOpen(true)}
              >
                Confirmar Reservación
              </Button>
            </Box>
          )}
        </>
      )}

      <PagoModal
        open={pagoOpen}
        onClose={() => setPagoOpen(false)}
        onConfirm={handlePagoConfirm}
        total={selectedSeats.length * 8}
      />

      <QRModal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        reservacionId={reservacionId}
      />
    </Box>
  );
};

export default ButacaSelector;