// src/NavBarComponent.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBarComponent() {
  return (
<Navbar bg="dark" variant="dark" expand="lg" fixed="top">

      <Container>
        {/* Logo + Título */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src="/images/logoGuad2.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo Guadalcázar"
          />
          Guadalcázar
        </Navbar.Brand>

        {/* Botón para colapsar en móvil */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="#inicio">Inicio</Nav.Link>
          <Nav.Link href="#serviciospublicosmunicipales">Servicios Públicos Municipales</Nav.Link>
          <Nav.Link href="#obraspublicas">Obras Públicas</Nav.Link>
          <Nav.Link href="#deportes">Deportes</Nav.Link>
          <Nav.Link href="#cultura">Cultura</Nav.Link>
          <Nav.Link href="#desarrollosocial">Desarollo Social</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
