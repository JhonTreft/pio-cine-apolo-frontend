import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate(); // Hook para redirigir si es necesario

  useEffect(() => {
    // Verifica si el token existe en localStorage
    const token = localStorage.getItem('token');
    
    // Si no hay token, redirige al usuario a la página de login
    if (!token) {
      navigate('/login');
    }
  }, [navigate]); // Ejecutar solo una vez al montar el componente

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
      <div className="text-center text-white p-10 bg-opacity-80 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Bienvenido al Teatro Apolo</h1>
        <p className="text-xl mb-6">¡Descubre las mejores películas y realiza tu reserva online!</p>
        <nav>
          <ul className="space-y-6 ">
            <li>
              <Link
                to="/logout"
                className="text-xl bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2  transition-all rounded-md"
              >
                Cerrar Sesión
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="text-xl bg-pink-700 hover:bg-pink-800 text-white px-6 py-2  transition-all rounded-md"
              >
                Ver Cartelera
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="text-xl bg-green-200 hover:bg-green-200 px-6 py-2  transition-all rounded-md text-black font-bold"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
