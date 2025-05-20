// controllers/reservacionController.js
const Reservacion = require('../models/Reservacion');
const { validationResult } = require('express-validator');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { genSalt } = require('bcryptjs');

const crearReservacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { sala_id, fecha, asientos } = req.body;
    const reservacionId = await Reservacion.create({
      usuario_id: req.user.id,
      sala_id,
      fecha,
      asientos
    });
    res.status(201).json({ message: 'Reservación creada exitosamente', reservacionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reservación' });
  }
};

const obtenerReservacionesUsuario = async (req, res) => {
  try {
    const reservaciones = await Reservacion.findByUser(req.user.id);
    res.json(reservaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservaciones' });
  }
};

const actualizarEstadoReservacion = async (req, res) => {
  try {
    await Reservacion.updateStatus(req.params.id, req.body.estado);
    res.json({ message: 'Estado de reservación actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el estado' });
  } 
};

const generarQR = async (req, res) => {
  try {
    const { reservacionId } = req.params;
    const reservacion = await Reservacion.findById(reservacionId);
    const sala = await Sala.findById(reservacion.sala_id);
    
    const qrData = {
      reservacionId: reservacion.id,
      pelicula: sala.pelicula,
      sala: sala.nombre,
      fecha: reservacion.fecha,
      asientos: JSON.parse(reservacion.asientos),
      usuario: req.user.username
    };

    const qrPath = path.join(__dirname, '../temp/qr_' + reservacionId + '.png');
    
    await QRCode.toFile(qrPath, JSON.stringify(qrData));
    
    res.download(qrPath, `reserva_${reservacionId}.png`, (err) => {
      fs.unlinkSync(qrPath); // Eliminar el archivo después de enviarlo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar QR' });
  }
};


module.exports = {
  crearReservacion,
  obtenerReservacionesUsuario,
  actualizarEstadoReservacion,
  generarQR
};