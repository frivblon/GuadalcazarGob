// src/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Styles.css'; // Asegúrate de tener estilos si los necesitas

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Sobre nosotros</h5>
            <p>
              Guadalcázar, un lugar lleno de historia y belleza natural. Síguenos en nuestras redes sociales para más información.
            </p>
          </Col>
          <Col md={3}>
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li><a href="#inicio" className="text-light">Inicio</a></li>
              <li><a href="#historia" className="text-light">Historia</a></li>
              <li><a href="#galeria" className="text-light">Galería</a></li>
              <li><a href="#contacto" className="text-light">Contacto</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contacto</h5>
            <p>Email: info@guadalcazar.mx</p>
            <p>Tel: +52 123 456 7890</p>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Guadalcázar. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}

export default Footer;
