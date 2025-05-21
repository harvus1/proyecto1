import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ReservacionCard = ({ reserva }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-bold text-lg">{reserva.funcion.pelicula.titulo}</h3>
        <p className="text-sm text-gray-600">
          {format(new Date(reserva.fecha), 'PPP')} -{' '}
          {format(new Date(reserva.funcion.horario), 'HH:mm')}
        </p>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <p className="font-semibold">Sala {reserva.sala.numero}</p>
          <p className="text-sm">
            Butacas: {reserva.butacas.map(b => `${b.fila}${b.numero}`).join(', ')}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-bold">${reserva.total.toFixed(2)}</span>
          <Link
            to={`/mis-reservaciones/${reserva.id}`}
            className="text-blue-600 hover:underline text-sm"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservacionCard;