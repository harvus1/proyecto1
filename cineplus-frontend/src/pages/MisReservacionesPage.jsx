import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/Layout/PrivateRoute';
import ReservacionCard from '../components/ReservacionCard';

const MisReservacionesPage = () => {
  const { user } = useAuth(); // Corregido de us=Auth a useAuth
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        // Simulación de llamada a API
        const response = await fetch(`/api/reservaciones?userId=${user.id}`);
        const data = await response.json();
        setReservaciones(data);
      } catch (error) {
        console.error('Error fetching reservaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservaciones();
  }, [user.id]);

  if (loading) return <div>Cargando reservaciones...</div>;

  return (
    <PrivateRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mis Reservaciones</h1>
        
        {reservaciones.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No tienes reservaciones aún</p>
            <Link 
              to="/salas" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Ver Salas Disponibles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservaciones.map(reserva => (
              <ReservacionCard key={reserva.id} reserva={reserva} />
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default MisReservacionesPage;