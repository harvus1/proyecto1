// routes/salaRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middlewares/auth');
const salaController = require('../controllers/salaController');
const salaValidators = require('../validators/salaValidators');

router.post('/', auth, isAdmin, salaValidators, salaController.crearSala);
router.get('/', auth, salaController.obtenerSalas);
router.get('/:id', auth, salaController.obtenerSala);
router.put('/:id', auth, isAdmin, salaValidators, salaController.actualizarSala);
router.delete('/:id', auth, isAdmin, salaController.eliminarSala);
router.get('/:id/asientos', auth, salaController.obtenerAsientos);

module.exports = router;