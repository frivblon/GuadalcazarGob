// src/CarouselComponent.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Styles.css';

function CarouselComponent() {
  return (
    <Carousel className="full-width-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrusel1_1.jpg"
          alt="Guadalcazar"
        />
        <Carousel.Caption>
          <h3>Guadalcázar</h3>
          <p>Bienvenido</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrusel2.jpg"
          alt="Segunda imagen"
        />
        <Carousel.Caption>
          <h3>Iglesia Guadalcázar</h3>
          <p>Centro de Guadalcázar.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carrusel3.jpg"
          alt="Tercera imagen"
        />
        <Carousel.Caption>
          <h3>Guadalcázar</h3>
          <p>Hermoso atardecer.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
