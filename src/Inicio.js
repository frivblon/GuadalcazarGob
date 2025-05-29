import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import NavBar from './navBar';
import Footer from './Footer';
import InfoCard from './InfoCard';
import CarouselComponent from './CarouselComponent';

function Inicio() {
  return (
    <>
      <NavBar />
      <CarouselComponent />
            <InfoCard />
      <Footer />
    </>
  );
}

export default Inicio;
