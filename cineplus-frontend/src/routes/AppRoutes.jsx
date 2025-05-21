import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SalasPage from '../pages/SalasPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MisReservacionesPage from '../pages/MisReservacionesPage';
import MiPerfilPage from '../pages/MiPerfilPage';
import ButacasPage from '../pages/Admin/ButacasPage'; 
import PrivateRoute from '../components/Layout/PrivateRoute';
import AdminRoute from '../components/Layout/AdminRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/salas" element={<SalasPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/mis-reservaciones" element={<MisReservacionesPage />} />
        <Route path="/mi-perfil" element={<MiPerfilPage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin/reservaciones" element={<ButacasPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;