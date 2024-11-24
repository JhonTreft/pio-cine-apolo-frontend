// src/pages/MoviePage.tsx
import React from 'react'
import MovieList from '../components/MovieList'

const MoviePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Películas en Cartelera</h2>
        <MovieList />
      </div>
    </div>
  )
}

export default MoviePage
