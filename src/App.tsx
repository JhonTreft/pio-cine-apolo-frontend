import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import MovieList from './components/MovieList';
import Logout from './pages/Logout';
import Dashboard from './components/Dash';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/logout" element={<Logout />} />
        <Route path='/dashboard' element={<Dashboard />} key='dashboard'></Route>
      </Routes>
    </Router>
  );
};

export default App;
