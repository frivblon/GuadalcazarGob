// src/ProyectoDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook para leer los parámetros de la URL
import apiClient from './apiClient';

const ProyectoDetalle = () => {
    // 1. Obtenemos el 'id' de la URL (ej: el "1" en "/proyectos/1")
    const { id } = useParams(); 
    
    // 2. Estados para guardar el proyecto y la carga
    const [proyecto, setProyecto] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3. Efecto para buscar los datos del proyecto específico en la API
    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/proyectos/${id}`);
                setProyecto(response.data);
            } catch (error) {
                console.error("Error al obtener el detalle del proyecto:", error);
                // Aquí podrías redirigir a una página de error 404
            } finally {
                setLoading(false);
            }
        };

        fetchProyecto();
    }, [id]); // Se ejecuta cada vez que el 'id' de la URL cambie

    if (loading) {
        return <div className="text-center my-5">Cargando proyecto...</div>;
    }

    if (!proyecto) {
        return <div className="text-center my-5">Proyecto no encontrado.</div>;
    }
    
    // Función para formatear la fecha
    const formattedDate = new Date(proyecto.created_at).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* --- TÍTULO --- */}
                    <h1 className="display-5 mb-3">{proyecto.title}</h1>

                    {/* --- FECHA --- */}
                    <p className="text-muted">
                        <i className="fas fa-calendar-alt me-2"></i>
                        Publicado el {formattedDate}
                    </p>

                    {/* --- IMAGEN ILUSTRATIVA --- */}
                    <img 
                        src={proyecto.image_url} 
                        className="img-fluid rounded shadow-sm mb-4" 
                        alt={proyecto.title} 
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                    />
                    
                    {/* --- DESCRIPCIÓN COMPLETA --- */}
                    <div className="project-description" style={{ lineHeight: '1.8' }}>
                        <p>{proyecto.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProyectoDetalle;