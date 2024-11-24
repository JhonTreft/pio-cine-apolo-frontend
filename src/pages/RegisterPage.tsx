import React from 'react'
import Register from '../components/Register'

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Crear una nueva cuenta</h2>
        <Register />
      </div>
    </div>
  )
}

export default RegisterPage
