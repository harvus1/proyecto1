// routes/reservacionRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const reservacionController = require('../controllers/reservacionController');

router.post('/', auth, reservacionController.crearReservacion);
router.get('/mis-reservaciones', auth, reservacionController.obtenerReservacionesUsuario);
router.put('/:id/estado', auth, reservacionController.actualizarEstadoReservacion);

module.exports = router;