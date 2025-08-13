// src/apiClient.js

import axios from 'axios';

// Creamos una instancia de axios con la configuración centralizada
const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // La URL base de tu API de Laravel
  withCredentials: true,          // ¡La opción clave para enviar cookies!
});

export default apiClient;