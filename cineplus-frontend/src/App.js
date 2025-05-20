import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import theme from './theme';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';
import AdminRoute from './components/Layout/AdminRoute';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/Layout/Layout';

// Páginas públicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SalasPage from './pages/SalasPage';

// Páginas privadas
import ButacasPage from './pages/ButacasPage';
import MisReservacionesPage from './pages/MisReservacionesPage';
import MiPerfilPage from './pages/MiPerfilPage';

// Páginas de administración
import AdminSalasPage from './pages/Admin/SalasPage';
import AdminNuevaSalaPage from './pages/Admin/NuevaSalaPage';
import AdminEditarSalaPage from './pages/Admin/EditarSalaPage';
import AdminUsuariosPage from './pages/Admin/UsuariosPage';
import AdminDashboardPage from './pages/Admin/DashboardPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/salas" element={<SalasPage />} />

            {/* Rutas privadas  */}
            <Route path="/butacas/:salaId" element={
              <PrivateRoute>
                <ButacasPage />
              </PrivateRoute>
            } />
            <Route path="/mis-reservaciones" element={
              <PrivateRoute>
                <MisReservacionesPage />
              </PrivateRoute>
            } />
            <Route path="/mi-perfil" element={
              <PrivateRoute>
                <MiPerfilPage />
              </PrivateRoute>
            } />

            {/* Rutas de administración  */}
            <Route path="/admin" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              </PrivateRoute>
            } />
            <Route path="/admin/salas" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminSalasPage />
                </AdminRoute>
              </PrivateRoute>
            } />
            <Route path="/admin/salas/nueva" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminNuevaSalaPage />
                </AdminRoute>
              </PrivateRoute>
            } />
            <Route path="/admin/salas/editar/:id" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminEditarSalaPage />
                </AdminRoute>
              </PrivateRoute>
            } />
            <Route path="/admin/usuarios" element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminUsuariosPage />
                </AdminRoute>
              </PrivateRoute>
            } />

            {/* Ruta para páginas no encontradas */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;