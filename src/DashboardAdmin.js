// src/components/DashboardAdmin.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    // Definimos las secciones del panel de administración
    const adminSections = [
        {
            title: "Proyectos (Obras Públicas)",
            path: "/admin/proyectos",
            icon: "fas fa-hard-hat",
            description: "Agrega, edita o elimina los proyectos de obras públicas."
        },
        {
            title: "Contenido Cultural",
            path: "/admin/cultura",
            icon: "fas fa-palette",
            description: "Administra las noticias y eventos culturales y sociales."
        },
         {
            title: "Eventos Deportivos",
            path: "/admin/eventos",
            icon: "fas fa-futbol",
            description: "Gestiona los eventos y noticias de la sección de deportes."
        },
        {
            title: "Inscripciones a Eventos",
            path: "/admin/inscripciones",
            icon: "fas fa-users",
            description: "Visualiza la lista de personas inscritas a los eventos deportivos."
        },
        {
            title: "Infocards de Información de Inicio ",
            path: "/info-card",
            icon: "fas fa-users",
            description: "Agrega InfoCards a la seccion de Inicio."
        },
         {
            title: "Desarrollo Social",
            path: "/admin/programas-sociales",
            icon: "fas fa-users",
            description: "Administra los programas sociales y sus detalles."
        }
        // Puedes agregar más secciones aquí en el futuro
    ];

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4">Panel de Administración</h1>
                <p className="lead text-muted">Selecciona una sección para gestionar su contenido.</p>
            </div>

            <div className="row g-4">
                {adminSections.map((section, index) => (
                    <div key={index} className="col-md-6">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body text-center">
                                <i className={`${section.icon} fa-3x text-primary mb-3`}></i>
                                <h5 className="card-title">{section.title}</h5>
                                <p className="card-text">{section.description}</p>
                                <Link to={section.path} className="btn btn-primary stretched-link">
                                    Gestionar
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;