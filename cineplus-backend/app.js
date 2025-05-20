require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
async function startServer() {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release(); // Liberar la conexión inmediatamente
    
    // Rutas
    app.use('/api/auth', require('./routes/authRoutes'));
    app.use('/api/users', require('./routes/userRoutes'));
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
}

startServer();