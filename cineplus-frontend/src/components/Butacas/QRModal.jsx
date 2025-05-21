import { useEffect } from 'react';
import QRCode from 'qrcode.react';

const QRModal = ({ reservaId, onClose }) => {
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    // Generar datos únicos para el QR
    setQrData(`CINEPLUS:RESERVA:${reservaId}:${Date.now()}`);
  }, [reservaId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xs text-center">
        <h2 className="text-xl font-bold mb-4">Tu código QR</h2>
        
        <div className="flex justify-center mb-4">
          <QRCode 
            value={qrData} 
            size={200} 
            level="H" 
            includeMargin={true} 
          />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Muestra este código al ingresar a la sala
        </p>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default QRModal;