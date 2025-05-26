import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import NavBar from './navBar';
import Footer from './Footer';
import CarouselComponent from './CarouselComponent';

function App() {
  return (
    <>
      <NavBar />
      <CarouselComponent />
      <Footer />
    </>
  );
}

export default App;
