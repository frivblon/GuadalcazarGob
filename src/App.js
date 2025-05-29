import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Cambié Switch por Routes
import './Styles.css';
import Inicio from './Inicio';
import NavBar from './navBar';
import Prueba from './Prueba';
import Footer from './Footer';
import InfoCard from './InfoCard';
import CarouselComponent from './CarouselComponent';

function App() {
  return (
    <Router>
   <div className="App">
        {/* Define las rutas dentro del Router, utilizando Routes y element */}
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Ruta para la página principal*/}
          <Route path="/Prueba" element={<Prueba />} /> {/* Ruta para la página "Prueba" */}
           </Routes>
      </div>
    </Router>
  );
}

export default App;
