import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Intercept each request to add the Authorization header
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  login(data: Record<string, any>) {
    return apiClient.post('/login', data);
  },
  register(data: Record<string, any>) {
    return apiClient.post('/register', data);
  },
  logout() {
    return apiClient.post('/logout');
  },
  getChirps() {
    return apiClient.get('/chirps');
  },
  postChirp(data: Record<string, any>) {
    return apiClient.post('/chirps', data);
  },
  deleteChirp(id: number) {
    return apiClient.delete(`/chirps/${id}`);
  }
};
