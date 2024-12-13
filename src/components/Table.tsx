import React, { useEffect, useState } from "react";

interface Reservation {
  id: number;
  userName: string;
  reservationDate: string;
  movieTitle:string;
}

const Table: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reservations/index"); 
        const data = await response.json();
        setReservations(data); // Asegúrate que la estructura de `data` coincida con el tipo `Reservation[]`
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-x-auto overflow-y-auto h-96 border border-gray-200 md:rounded-lg shadow-md">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Usuario
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Fecha Reserva
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Pelicula
                      </th>

                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.length > 0 ? (
                      reservations.map((reservation) => (
                        <tr key={reservation.id} className="odd:bg-gray-50 even:bg-white">
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              {reservation.id}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {reservation.userName}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {reservation.reservationDate}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {reservation.movieTitle}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-sm text-gray-500 text-center">
                          No hay reservas disponibles.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Table;
