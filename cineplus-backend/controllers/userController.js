const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;
    await User.updateStatus(id, activo);
    res.json({ message: 'Estado de usuario actualizado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

module.exports = { getUsers, updateUserStatus };