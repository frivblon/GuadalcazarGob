// src/components/ObrasPublicas.jsx
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// ⬇️ 1. Importamos nuestro cliente API centralizado
import apiClient from './apiClient';

const ObrasPublicas = () => {
  // ⬇️ 2. Estado para guardar los proyectos que vengan del API (inicialmente vacío)
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para mostrar un mensaje de carga

  // ⬇️ 3. useEffect para obtener los datos cuando el componente se monta
  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        setLoading(true); // Empezamos a cargar
        const response = await apiClient.get('/api/proyectos');
        setProyectos(response.data); // Guardamos los proyectos del API en el estado
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
        // Aquí podrías guardar un estado de error para mostrar un mensaje al usuario
      } finally {
        setLoading(false); // Terminamos de cargar, haya funcionado o no
      }
    };

    fetchProyectos();
  }, []); // El array vacío [] asegura que se ejecute solo una vez

  // Mensaje de carga mientras esperamos la respuesta del API
  if (loading) {
    return <div className="text-center my-5">Cargando proyectos...</div>;
  }

  return (
    <div className="container my-5">
      {/* --- SECCIÓN DE TÍTULO E INTRODUCCIÓN (Sin cambios) --- */}
      <div className="text-center mb-5">
        <h1 className="display-4">Obras Públicas</h1>
        <p className="lead text-muted">
          Trabajando para construir un Guadalcázar más fuerte, moderno y conectado.
        </p>
      </div>

      {/* --- SECCIÓN DE PROYECTOS DESTACADOS (Ahora es dinámica) --- */}
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="mb-4">Proyectos Recientes</h2>
          <hr style={{ width: '100px', margin: 'auto', borderTop: '3px solid #0d6efd' }} className="mb-5" />
        </div>
      </div>

    <div className="row g-4">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={proyecto.image_url} className="card-img-top" alt={proyecto.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <i className={`${proyecto.icon} text-primary me-2`}></i>
                  {proyecto.title}
                </h5>
                <p className="card-text flex-grow-1">{proyecto.description}</p>
                
                {/* ⬇️ 2. Reemplaza <a> por <Link> con la ruta dinámica */}
                <Link to={`/proyectos/${proyecto.id}`} className="btn btn-outline-primary mt-auto align-self-start">
                  Ver más detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECCIÓN DE RESPONSABILIDADES (Sin cambios) --- */}
      {/* ... (el resto de tu componente no necesita cambios) ... */}
    </div>
  );
};

export default ObrasPublicas;