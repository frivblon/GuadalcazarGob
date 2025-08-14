// src/components/ObrasPublicas.jsx

import React from 'react';

// Datos de ejemplo basados en proyectos comunes en la región.
// En una aplicación real, esto vendría de tu API.
const proyectos = [
  {
    id: 1,
    titulo: 'Pavimentación de la Calle Morelos',
    descripcion: 'Modernización de una de las principales vías de la cabecera municipal con concreto hidráulico, mejorando el tránsito y la calidad de vida de los vecinos.',
    imagen: '',
    icono: 'fas fa-road',
  },
  {
    id: 2,
    titulo: 'Rehabilitación de la Red de Agua Potable',
    descripcion: 'Sustitución de tuberías en la comunidad de Pozas de Santa Ana para reducir fugas y garantizar el abasto de agua potable a más de 200 familias.',
    imagen: '',
    icono: 'fas fa-tint',
  },
  {
    id: 3,
    titulo: 'Ampliación de la Red de Alumbrado Público',
    descripcion: 'Instalación de nuevas luminarias con tecnología LED en la comunidad de El Realejo, proporcionando mayor seguridad y visibilidad nocturna.',
    imagen: '',
    icono: 'fas fa-lightbulb',
  },
];

const ObrasPublicas = () => {
  return (
    <div className="container my-5">
      {/* --- SECCIÓN DE TÍTULO E INTRODUCCIÓN --- */}
      <div className="text-center mb-5">
        <h1 className="display-4">Obras Públicas</h1>
        <p className="lead text-muted">
          Trabajando para construir un Guadalcázar más fuerte, moderno y conectado.
        </p>
      </div>

      {/* --- SECCIÓN DE PROYECTOS DESTACADOS --- */}
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
              <img src={proyecto.imagen} className="card-img-top" alt={proyecto.titulo} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <i className={`${proyecto.icono} text-primary me-2`}></i>
                  {proyecto.titulo}
                </h5>
                <p className="card-text flex-grow-1">{proyecto.descripcion}</p>
                <a href="#" className="btn btn-outline-primary mt-auto align-self-start">
                  Ver más detalles
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- SECCIÓN DE RESPONSABILIDADES --- */}
      <div className="row mt-5 pt-5">
        <div className="col-lg-8 mx-auto">
          <div className="card bg-light border-0">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Nuestras Responsabilidades</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">
                  <i className="fas fa-tasks text-primary me-2"></i>
                  Planeación y ejecución de proyectos de infraestructura municipal.
                </li>
                <li className="list-group-item bg-light">
                  <i className="fas fa-hard-hat text-primary me-2"></i>
                  Construcción y mantenimiento de calles, caminos y banquetas.
                </li>
                <li className="list-group-item bg-light">
                  <i className="fas fa-plug text-primary me-2"></i>
                  Supervisión y mejora de la red de alumbrado público.
                </li>
                <li className="list-group-item bg-light">
                  <i className="fas fa-building text-primary me-2"></i>
                  Mantenimiento y rehabilitación de edificios y espacios públicos.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObrasPublicas;