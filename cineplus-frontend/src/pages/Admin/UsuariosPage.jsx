import React, { useState, useEffect, useContext } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Switch,
  Box
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import { getUsers, updateUserStatus } from '../../api/users';

const UsuariosPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, activo) => {
    try {
      await updateUserStatus(userId, activo);
      setUsers(users.map(u => u.id === userId ? { ...u, activo } : u));
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (user?.role !== 'admin') return <Typography>No tienes permisos para acceder a esta página</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Administración de Usuarios</Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.activo}
                    onChange={(e) => handleStatusChange(user.id, e.target.checked)}
                    color="primary"
                  />
                  {user.activo ? 'Activo' : 'Inactivo'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsuariosPage;