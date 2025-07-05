import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Cambié Switch por Routes
import './Styles.css';
import Inicio from './Inicio';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Router>
   <div className="App">
        {/* Define las rutas dentro del Router, utilizando Routes y element */}
        <Routes>
          <Route path="/" element={<Inicio />} /> {/* Ruta para la página principal*/}
          <Route path="/Register.js" element={<Register />} /> {/* Ruta para la página "Prueba" */}
           <Route path="/Login.js" element={<Login />} /> {/* Ruta para la página "Prueba" */}
           </Routes>
      </div>
    </Router>
  );
}

export default App;
