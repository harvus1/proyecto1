export const crearReservacion = async (reservaData) => {
  const response = await fetch('/api/reservaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservaData)
  });
  return await response.json();
};

export const obtenerReservacionesUsuario = async (userId) => {
  const response = await fetch(`/api/reservaciones?userId=${userId}`);
  return await response.json();
};

export const validarReservacion = async (reservaId) => {
  const response = await fetch(`/api/reservaciones/${reservaId}/validar`, {
    method: 'POST'
  });
  return await response.json();
};