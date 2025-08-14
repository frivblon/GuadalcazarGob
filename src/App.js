import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// ⬇️ 1. Importa 'Navigate' para poder hacer redirecciones
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './Styles.css';
import './App.css';

// Componentes
import Inicio from './Inicio';
import Login from './Login';
import Register from './Register';
import InfoCard from './InfoCard';
import Prueba from './Prueba';
import ObrasPublicas from './ObrasPublicas';
import AdminProyectos from './AdminProyectos';
import NavBarComponent from './navBar';
import Footer from './Footer';
import ProyectoDetalle from './ProyectoDetalle';

// ⬇️ 2. Importa 'useAuth' junto con 'AuthProvider'
import { AuthProvider, useAuth } from './AuthContext';

// La configuración de Axios no es necesaria aquí si ya la tienes en apiClient.js
// import axios from 'axios';
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://12centralizado...

// ⬇️ 3. Creamos un componente interno para las rutas
//    Esto es necesario porque el hook 'useAuth' solo puede ser usado por componentes
//    que están DENTRO del AuthProvider.
const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Ahora esta llamada es válida

  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/InfoCard" element={<InfoCard />} />
      <Route path="/AdminProyectos" element={<AdminProyectos />} />
      <Route path="/ObrasPublicas" element={<ObrasPublicas />} />
       {/* El ":id" es un parámetro que cambiará según el proyecto */}
       <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
      <Route 
        path="/admin/proyectos" 
        element={isAuthenticated ? <AdminProyectos /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Este div ahora es un contenedor flexbox gracias al CSS que añadimos */}
        <div className="App">
          <NavBarComponent />
          
          {/* ⬇️ Envolvemos las rutas en un <main> con la nueva clase ⬇️ */}
          <main className="main-content">
            <AppRoutes />
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;