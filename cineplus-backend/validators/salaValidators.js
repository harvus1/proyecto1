// validators/salaValidators.js
const { body } = require('express-validator');

const salaValidators = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('pelicula').notEmpty().withMessage('La película es requerida'),
  body('filas').isInt({ min: 1 }).withMessage('Debe tener al menos 1 fila'),
  body('columnas').isInt({ min: 1 }).withMessage('Debe tener al menos 1 columna')
];

module.exports = salaValidators;