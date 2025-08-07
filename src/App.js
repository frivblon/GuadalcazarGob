import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import './Styles.css';
import Inicio from './Inicio';
import Login from './Login';
import Register from './Register';
import axios from 'axios'; 

// ⬅️ Configuración global de Axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000'; // ⬅️ URL de tu backend de Laravel

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Register.js" element={<Register />} />
          <Route path="/Login.js" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;