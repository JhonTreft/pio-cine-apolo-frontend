import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify

import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Link } from 'react-router-dom'; // Si usas React Router para la navegación


const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const navigate = useNavigate(); // Define el hook de navegación

  // Validar formulario
  const validateForm = (): boolean => {
    let formErrors: { username?: string; password?: string } = {};
    if (!username) {
      formErrors.username = 'El nombre de usuario es obligatorio';
    }
    if (!password) {
      formErrors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      formErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(formErrors);

    // Si no hay errores, se puede enviar el formulario
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario antes de enviar
    if (!validateForm()) {
      return; // Si el formulario tiene errores, no enviar la solicitud
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', { username, password });
      toast.success('Usuario registrado con éxito'); // Notificación de éxito
      setTimeout(() => {
        navigate('/login');
      },3000)
      console.log('Usuario registrado:', response.data);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`); // Muestra el mensaje del backend
      } else {
        toast.error('Error al registrar usuario'); // Mensaje genérico para errores inesperados
      }
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>} {/* Mensaje de error */}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} {/* Mensaje de error */}
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Registrarse
        </button>

        <p className="text-center">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-indigo-600 hover:underline">Iniciar sesión</Link>
        </p>

      </form>
    </div>
  );
};

export default Register;
