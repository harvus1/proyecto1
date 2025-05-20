// models/User.js
const db = require('../config/db');

class User {
  static async create({ username, password, email, role = 'cliente' }) {
    const [result] = await db.execute(
      'INSERT INTO usuarios (username, password, email, role) VALUES (?, ?, ?, ?)',
      [username, password, email, role]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  }
  static async updateStatus(id, activo) {
    await db.execute(
      'UPDATE usuarios SET activo = ? WHERE id = ?',
      [activo, id]
    );
    return true;
  }
  static async findAll() {
    const [rows] = await db.execute('SELECT id, username, email, role, activo FROM usuarios');
    return rows;
  }

}

module.exports = User;