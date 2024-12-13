import React from 'react';
import moment from 'moment';

interface Reservation {
  userName: string;
  reservationDate: string; // Fecha de la reserva
}

interface ModalProps {
  movie: {
    title: string;
    description: string;
    reservationsList: Reservation[]; // Lista de reservas
  };
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Detalles de la Reserva</h2>
        <p className="mb-2"><strong>Pelicula:</strong> {movie.title}</p>
        <p className="mb-4"><strong>Descripción:</strong> {movie.description}</p>

        {/* Mostrar cada reserva en un formato de cuadrito */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {movie.reservationsList.map((reservation, index) => {
            // Formatear la fecha de la reserva
            return (
              <div key={index} className="bg-gray-100 p-4 border rounded-lg shadow-sm">
                <p className="font-semibold">Usuario: {reservation.userName}</p>
                <p className="mt-2">Fecha de Reserva: {reservation.reservationDate}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white font-bold py-2 rounded-lg hover:bg-red-600 transition-all mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
