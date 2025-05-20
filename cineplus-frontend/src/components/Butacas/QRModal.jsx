import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import QRCode from 'react-qr-code';

const QRModal = ({ open, onClose, reservacionId }) => {
  const downloadQR = () => {
    window.open(`${process.env.REACT_APP_API_URL}/reservaciones/${reservacionId}/qr`, '_blank');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reservación Confirmada</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <QRCode 
            value={`${process.env.REACT_APP_API_URL}/reservaciones/${reservacionId}/qr`}
            size={256}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Guarda este código QR para presentarlo en el cine
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button variant="contained" onClick={downloadQR}>
          Descargar QR
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRModal;