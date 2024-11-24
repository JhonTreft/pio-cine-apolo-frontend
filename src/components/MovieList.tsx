import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';  // Importa el componente Navbar

interface Movie {
  id: string;
  title: string;
  description: string;
  image: string;
  selectedDate: string;
  reservations: number;  // Añadido para mostrar las reservas de la película
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');

  // Cargar el userId del localStorage cuando el componente se monta
  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);  

  // Cargar las películas desde la API
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((response) => {
        const moviesWithImages = response.data.map((movie: any) => ({
          ...movie,
          image: `https://picsum.photos/400/200?random=${movie.id}`,
          selectedDate: '',
          reservations: movie.reservationCount || 0,  // Asignar reservas disponibles
        }));
        setMovies(moviesWithImages);
        setFilteredMovies(moviesWithImages);  // Mostrar todas las películas al principio
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Error al obtener las películas', error);
        toast.error('Error al cargar las películas');
      });
  }, []);

  // Filtrar las películas por título
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()) // Filtra por título
    );
    setFilteredMovies(filtered);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, movieId: string) => {
    const newMovies = filteredMovies.map((movie) =>
      movie.id === movieId ? { ...movie, selectedDate: e.target.value } : movie
    );
    setFilteredMovies(newMovies);
  };

  const handleReservation = (movieId: string) => {
    const token = localStorage.getItem('token');  
    const movie = filteredMovies.find((movie) => movie.id === movieId);

    if (!userId) {
      toast.error('Debes estar logueado para realizar una reserva');
      return;
    }
    if (!movie?.selectedDate) {
      toast.error('Debes seleccionar una fecha para la reserva');
      return;
    }

    // Verificar si el usuario ya tiene una reserva para esa película en la misma fecha
    axios
      .get('http://localhost:5000/api/reservations/check', {
        params: {
          user_id: userId,
          movie_id: movieId,
          reservation_date: movie.selectedDate,
        },
      })
      .then((response) => {
        if (response.data.exists) {
          toast.error('Ya has reservado para esta película en esta fecha');
        } else {
          // Si no existe una reserva, proceder a hacerla
          axios
            .post(
              'http://localhost:5000/api/reservations',
              {
                user_id: userId,
                movie_id: movieId,
                reservation_date: movie.selectedDate,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(() => {
              toast.success(`Entrada reservada para la película: ${movie.title}`);
            })
            .catch((error) => {
              console.error('Error al realizar la reserva:', error);
              toast.error('Error al reservar la entrada');
            });
        }
      })
      .catch((error) => {
        console.error('Error al verificar la reserva existente:', error);
        toast.error('Error al verificar la reserva existente');
      });
  };

  return (
    <div>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {/* Campo de búsqueda */}
      <div className="px-6 mt-8">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Buscar película..."
          className="w-full p-3 border rounded-lg mb-6"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-8">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300 ease-in-out hover:cursor-pointer"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h3>
            <p className="text-gray-600 mb-4">{movie.description}</p>

            {/* Mostrar icono de reservas */}
            <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 4 3 3H5v3m3 10-3-3h14v-3m-9-2.5 2-1.5v4"/>
            </svg>

              <span className="text-sm text-gray-600">{movie.reservations} Reservas</span>
            </div>

            {/* Campo de entrada para que el usuario seleccione la fecha */}
            <div className="mb-4">
              <label htmlFor={`reservation-date-${movie.id}`} className="block text-sm text-gray-700">Fecha de reserva</label>
              <input
                type="date"
                id={`reservation-date-${movie.id}`}
                value={movie.selectedDate}
                onChange={(e) => handleDateChange(e, movie.id)}
                className="w-full p-2 mt-2 border rounded-lg"
              />
            </div>

            <button
              onClick={() => handleReservation(movie.id)}
              className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Reservar Entrada
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
