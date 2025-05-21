import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PagoModal = ({ butacasSeleccionadas, salaId, funcionId, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmarPago = async () => {
    setIsProcessing(true);
    try {
      // Simulación de pago y reserva
      const reservaData = {
        usuarioId: user.id,
        funcionId,
        salaId,
        butacas: butacasSeleccionadas,
        fecha: new Date().toISOString(),
        total: butacasSeleccionadas.length * 8.50 // Precio por butaca
      };

      const response = await fetch('/api/reservaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData)
      });

      if (response.ok) {
        navigate('/mis-reservaciones');
      } else {
        throw new Error('Error al procesar la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al procesar tu reserva');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirmar Reservación</h2>
        
        <div className="mb-4">
          <h3 className="font-semibold">Butacas seleccionadas:</h3>
          <ul className="mt-2">
            {butacasSeleccionadas.map(butaca => (
              <li key={butaca.id}>Fila {butaca.fila}, Asiento {butaca.numero}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Total a pagar:</h3>
          <p className="text-2xl font-bold">${(butacasSeleccionadas.length * 8.50).toFixed(2)}</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmarPago}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagoModal;