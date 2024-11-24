import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (username: string, email: string, password: string) => {
  return api.post('/register', { username, email, password });
};

export const loginUser = async (username: string, password: string) => {
  return api.post('/login', { username, password });
};

export const getMovies = async () => {
  return api.get('/movies');
};
g