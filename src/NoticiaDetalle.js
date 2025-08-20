// src/components/NoticiaDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from './apiClient';

const NoticiaDetalle = () => {
    // Obtenemos el 'id' de la URL
    const { id } = useParams(); 
    
    // Estados para guardar la noticia y la carga
    const [noticia, setNoticia] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efecto para buscar los datos de la noticia en la API
    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/noticias-culturales/${id}`);
                setNoticia(response.data);
            } catch (error) {
                console.error("Error al obtener el detalle de la noticia:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNoticia();
    }, [id]); // Se ejecuta cada vez que el 'id' de la URL cambie

    if (loading) {
        return <div className="text-center my-5">Cargando...</div>;
    }

    if (!noticia) {
        return <div className="text-center my-5">Contenido no encontrado.</div>;
    }
    
    // Función para formatear la fecha
    const formattedDate = new Date(noticia.event_date).toLocaleDateString('es-MX', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* --- TÍTULO --- */}
                    <h1 className="display-5 mb-3">{noticia.title}</h1>

                    {/* --- FECHA Y LUGAR --- */}
                    <div className="d-flex text-muted mb-3">
                        <p className="me-4">
                            <i className="fas fa-calendar-alt me-2"></i>
                            Fecha: {formattedDate}
                        </p>
                        <p>
                            <i className="fas fa-map-marker-alt me-2"></i>
                            Lugar: {noticia.location}
                        </p>
                    </div>

                    {/* --- IMAGEN ILUSTRATIVA --- */}
                    <img 
                        src={noticia.image_url} 
                        className="img-fluid rounded shadow-sm mb-4" 
                        alt={noticia.title} 
                        style={{ 
                            width: '100%', 
                            maxHeight: '500px', 
                            objectFit: 'cover' 
                        }}
                    />
                    
                    {/* --- DESCRIPCIÓN COMPLETA --- */}
                    <div className="content-description" style={{ lineHeight: '1.8' }}>
                        <p>{noticia.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticiaDetalle;