// models/Sala.js
const db = require('../config/db');

class Sala {
  static async create({ nombre, pelicula, imagen_poster, filas, columnas }) {
    const [result] = await db.execute(
      'INSERT INTO salas (nombre, pelicula, imagen_poster, filas, columnas) VALUES (?, ?, ?, ?, ?)',
      [nombre, pelicula, imagen_poster, filas, columnas]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM salas');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM salas WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { nombre, pelicula, imagen_poster, filas, columnas }) {
    await db.execute(
      'UPDATE salas SET nombre = ?, pelicula = ?, imagen_poster = ?, filas = ?, columnas = ? WHERE id = ?',
      [nombre, pelicula, imagen_poster, filas, columnas, id]
    );
    return true;
  }

  static async delete(id) {
    await db.execute('DELETE FROM salas WHERE id = ?', [id]);
    return true;
  }

  static async getAsientosReservados(salaId, fecha) {
    const [rows] = await db.execute(
      'SELECT asientos FROM reservaciones WHERE sala_id = ? AND fecha = ?',
      [salaId, fecha]
    );
    return rows.map(row => JSON.parse(row.asientos)).flat();
  }
}

module.exports = Sala;