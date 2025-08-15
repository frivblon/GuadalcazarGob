import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // ⬅️ Importa Link y useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContext'; // ⬅️ Importa el hook de autenticación
import axios from 'axios'; // ⬅️ Importa axios para la función de logout

function NavBarComponent() {
  const { isAuthenticated, logout } = useAuth(); // ⬅️ Obtenemos el estado y la función logout del contexto
  const navigate = useNavigate(); // ⬅️ Inicializamos el hook de navegación para redirigir tras el logout

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      // Llama a la API de Laravel para cerrar sesión
      await axios.post('/api/logout'); 
      logout(); // Actualiza el estado global de autenticación a 'false'
      navigate('/login'); // Redirige al usuario a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión en el backend:', error);
      // Aunque haya un error en la API, forzamos el logout localmente para desautenticar al usuario
      logout(); 
      navigate('/login'); // Redirige al usuario a la página de login incluso si hay un error en la API
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logoGuad2.png" // Asegúrate de que esta ruta sea correcta y la imagen exista
            width="150"
            height="75"
            className="d-inline-block align-top me-2"
            alt="Logo Guadalcázar"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/obras-publicas">Obras Públicas</Nav.Link>
            <Nav.Link as={Link} to="/deportes">Deportes</Nav.Link>
            <Nav.Link as={Link} to="/cultura">Cultura</Nav.Link>
            <Nav.Link as={Link} to="/desarrollo">Desarrollo Social</Nav.Link>
            

            {/* ⬅️ Lógica Condicional para "Agregar Infocards" */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/info-card">Agregar Infocards</Nav.Link>
            )}

            {/* ⬅️ Lógica Condicional para Login/Registro o Cerrar Sesión */}
            {isAuthenticated ? (
              <Nav.Link as="button" onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
                Cerrar Sesión
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Inicia Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">Regístrate</Nav.Link> {/* Opcional: enlazar a la página de registro */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;