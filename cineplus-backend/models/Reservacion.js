// models/Reservacion.js
const db = require('../config/db');

class Reservacion {
  static async create({ usuario_id, sala_id, fecha, asientos }) {
    const [result] = await db.execute(
      'INSERT INTO reservaciones (usuario_id, sala_id, fecha, asientos) VALUES (?, ?, ?, ?)',
      [usuario_id, sala_id, fecha, JSON.stringify(asientos)]
    );
    return result.insertId;
  }

  static async findByUser(usuario_id) {
    const [rows] = await db.execute(
      'SELECT r.*, s.nombre as sala_nombre, s.pelicula FROM reservaciones r JOIN salas s ON r.sala_id = s.id WHERE r.usuario_id = ?',
      [usuario_id]
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await db.execute(
      'UPDATE reservaciones SET estado = ? WHERE id = ?',
      [status, id]
    );
    return true;
  }
}

module.exports = Reservacion;