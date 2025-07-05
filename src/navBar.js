import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBarComponent() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logoGuad2.png"
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
            <Nav.Link as={Link} to="/obras">Obras Públicas</Nav.Link>
            <Nav.Link as={Link} to="/deportes">Deportes</Nav.Link>
            <Nav.Link as={Link} to="/cultura">Cultura</Nav.Link>
            <Nav.Link as={Link} to="/desarrollo">Desarrollo Social</Nav.Link>
              <Nav.Link as={Link} to="/Login.js">Inicia Sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
