import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";import './Styles.css';
import Inicio from './Inicio';
import Login from './Login';
import Register from './Register';
import InfoCard from './InfoCard';
import Prueba from './Prueba';
import { AuthProvider } from './AuthContext'; // ⬅️ Importa el proveedor de autenticación
import NavBarComponent from './navBar'; // ⬅️ Asegúrate de importar tu NavBar
import Footer from './Footer';
import axios from 'axios';

// Configuración global de Axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function App() {
  return (
    // ⬅️ Envuelve toda la aplicación con el AuthProvider
    <AuthProvider>
      <Router>
        <div className="App">
          {/* El NavBar y el Footer deben ir fuera de las rutas para mostrarse siempre */}
          <NavBarComponent />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/InfoCard" element={<InfoCard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;