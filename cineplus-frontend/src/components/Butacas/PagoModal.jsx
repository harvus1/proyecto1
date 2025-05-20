import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  Typography 
} from '@mui/material';
import CreditCard from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const PagoModal = ({ open, onClose, onConfirm, total }) => {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focused: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardData(prev => ({ ...prev, focused: e.target.name }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Información de Pago</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Total a pagar: ${total}</Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <CreditCard
            number={cardData.number}
            name={cardData.name}
            expiry={cardData.expiry}
            cvc={cardData.cvc}
            focused={cardData.focused}
          />
        </Box>
        
        <Box component="form">
          <TextField
            fullWidth
            label="Número de Tarjeta"
            name="number"
            value={cardData.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Nombre en la Tarjeta"
            name="name"
            value={cardData.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            margin="normal"
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              label="Fecha de Expiración (MM/AA)"
              name="expiry"
              value={cardData.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              margin="normal"
            />
            <TextField
              fullWidth
              label="CVC"
              name="cvc"
              value={cardData.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              margin="normal"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          variant="contained" 
          onClick={() => onConfirm(cardData)}
          disabled={!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvc}
        >
          Confirmar Pago
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PagoModal;