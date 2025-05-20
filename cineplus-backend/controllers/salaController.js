// controllers/salaController.js
const Sala = require('../models/Sala');
const { validationResult } = require('express-validator');
const upload = require('../middlewares/upload');

const crearSala = async (req, res) => {
  upload.single('imagen_poster')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, pelicula, filas, columnas } = req.body;
      const imagen_poster = req.file ? req.file.filename : null;
      
      const salaId = await Sala.create({ 
        nombre, 
        pelicula, 
        imagen_poster, 
        filas, 
        columnas 
      });
      
      res.status(201).json({ message: 'Sala creada exitosamente', salaId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la sala' });
    }
  });
};

const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll();
    res.json(salas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las salas' });
  }
};

const obtenerSala = async (req, res) => {
  try {
    const sala = await Sala.findById(req.params.id);
    if (!sala) {
      return res.status(404).json({ message: 'Sala no encontrada' });
    }
    res.json(sala);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la sala' });
  }
};

const actualizarSala = async (req, res) => {
  upload.single('imagen_poster')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nombre, pelicula, filas, columnas } = req.body;
      const imagen_poster = req.file ? req.file.filename : undefined;
      
      await Sala.update(req.params.id, { 
        nombre, 
        pelicula, 
        imagen_poster, 
        filas, 
        columnas 
      });
      
      res.json({ message: 'Sala actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la sala' });
    }
  });
};

const eliminarSala = async (req, res) => {
  try {
    await Sala.delete(req.params.id);
    res.json({ message: 'Sala eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la sala' });
  }
};

const obtenerAsientos = async (req, res) => {
  try {
    const { fecha } = req.query;
    const asientosReservados = await Sala.getAsientosReservados(req.params.id, fecha);
    res.json({ asientosReservados });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los asientos' });
  }
};

module.exports = {
  crearSala,
  obtenerSalas,
  obtenerSala,
  actualizarSala,
  eliminarSala,
  obtenerAsientos
};