import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './Styles.css';
import './App.css';

// --- Componentes de Páginas ---
import Inicio from './Inicio';
import Login from './Login';
import Register from './Register';
import InfoCard from './InfoCard';
import ObrasPublicas from './ObrasPublicas';
import ProyectoDetalle from './ProyectoDetalle';
import EventoDetalle from './EventoDetalle';
import NoticiaDetalle from './NoticiaDetalle';
import Deportes from './Deportes';
import Cultura from './Cultura';
import NavBarComponent from './navBar';
import Footer from './Footer';

// --- Componentes de Administración ---
import AdminProyectos from './AdminProyectos'; 
import AdminEventos from './AdminEventos'; 
import AdminInscripciones from './AdminInscripciones'; 
import AdminCultura from './AdminCultura';

// --- Contexto de Autenticación ---
import { AuthProvider, useAuth } from './AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<Inicio />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* ⬇️ 2. Rutas de contenido consistentes (en minúsculas) */}
      <Route path="/info-card" element={<InfoCard />} />
      <Route path="/obras-publicas" element={<ObrasPublicas />} />
      <Route path="/proyectos/:id" element={<ProyectoDetalle />} />
      
      <Route path="/deportes" element={<Deportes />} />
      <Route path="/deportes/:id" element={<EventoDetalle />} />

      <Route path="/cultura" element={<Cultura />} />
      <Route path="/cultura/:id" element={<NoticiaDetalle />} /> 
    
      {/* --- Rutas de Administración (Protegidas) --- */}
      <Route 
        path="/admin/proyectos" 
        element={isAuthenticated ? <AdminProyectos /> : <Navigate to="/login" />} 
      />
      
      <Route 
        path="/admin/eventos" 
        element={isAuthenticated ? <AdminEventos /> : <Navigate to="/login" />} 
      />

      <Route 
        path="/admin/inscripciones" 
        element={isAuthenticated ? <AdminInscripciones /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin/cultura" 
        element={isAuthenticated ? <AdminCultura /> : <Navigate to="/login" />} 
      />

    </Routes>
      
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <NavBarComponent />
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