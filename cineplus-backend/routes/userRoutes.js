// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middlewares/auth');
const userController = require('../controllers/userController');

// Ruta protegida de ejemplo
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});
router.get('/', auth, isAdmin, userController.getUsers);
router.put('/:id/status', auth, isAdmin, userController.updateUserStatus);


module.exports = router;