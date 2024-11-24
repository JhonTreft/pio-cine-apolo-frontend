import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate(); // Usamos navigate para redirigir al usuario

  useEffect(() => {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  }, [navigate]); // Se ejecuta cuando el componente se monta

  return <div>Cerrando sesión...</div>; // Mensaje opcional mientras se realiza el logout
}

export default Logout;
