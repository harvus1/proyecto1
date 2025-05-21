import { useState, useEffect } from 'react';
import AdminRoute from '../../components/Layout/AdminRoute';
import { format } from 'date-fns';

const ButacasPage = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fechaFiltro, setFechaFiltro] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    const fetchReservaciones = async () => {
      try {
        const response = await fetch(`/api/reservaciones/admin?fecha=${fechaFiltro}`);
        const data = await response.json();
        setReservaciones(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservaciones();
  }, [fechaFiltro]);

  const handleValidarEntrada = async (reservaId) => {
    try {
      await fetch(`/api/reservaciones/${reservaId}/validar`, {
        method: 'POST'
      });
      setReservaciones(prev => prev.map(r => 
        r.id === reservaId ? {...r, validada: true} : r
      ));
    } catch (error) {
      console.error('Error validando entrada:', error);
    }
  };

  return (
    <AdminRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Administración de Reservaciones</h1>
        
        <div className="mb-6">
          <label className="block mb-2">Filtrar por fecha:</label>
          <input
            type="date"
            value={fechaFiltro}
            onChange={(e) => setFechaFiltro(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Usuario</th>
                  <th className="py-2 px-4 border">Película</th>
                  <th className="py-2 px-4 border">Sala</th>
                  <th className="py-2 px-4 border">Horario</th>
                  <th className="py-2 px-4 border">Butacas</th>
                  <th className="py-2 px-4 border">Estado</th>
                  <th className="py-2 px-4 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservaciones.map(reserva => (
                  <tr key={reserva.id}>
                    <td className="py-2 px-4 border">{reserva.id}</td>
                    <td className="py-2 px-4 border">{reserva.usuario.nombre}</td>
                    <td className="py-2 px-4 border">{reserva.funcion.pelicula.titulo}</td>
                    <td className="py-2 px-4 border">Sala {reserva.sala.numero}</td>
                    <td className="py-2 px-4 border">
                      {format(new Date(reserva.funcion.horario), 'HH:mm')}
                    </td>
                    <td className="py-2 px-4 border">
                      {reserva.butacas.map(b => `${b.fila}${b.numero}`).join(', ')}
                    </td>
                    <td className="py-2 px-4 border">
                      {reserva.validada ? (
                        <span className="text-green-600">Validada</span>
                      ) : (
                        <span className="text-yellow-600">Pendiente</span>
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {!reserva.validada && (
                        <button
                          onClick={() => handleValidarEntrada(reserva.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Validar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminRoute>
  );
};

export default ButacasPage;