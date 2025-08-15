// src/EventoDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from './apiClient';
import InscripcionForm from './InscripcionForm';

const EventoDetalle = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/api/evento-deportivos/${id}`);
                setEvento(response.data);
            } catch (error) {
                console.error("Error al obtener el detalle del evento:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvento();
    }, [id]);

    if (loading) {
        return <div className="text-center my-5">Cargando evento...</div>;
    }

    if (!evento) {
        return <div className="text-center my-5">Evento no encontrado.</div>;
    }
    
    // Formateamos la fecha del evento para mostrarla amigablemente
    const formattedDate = new Date(evento.event_date).toLocaleDateString('es-MX', {
        timeZone: 'UTC', // Importante para evitar desfases de un día
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    {/* --- TÍTULO --- */}
                    <h1 className="display-5 mb-3">{evento.title}</h1>

                    {/* --- FECHA Y LUGAR --- */}
                    <div className="d-flex text-muted mb-3">
                        <p className="me-4">
                            <i className="fas fa-calendar-alt me-2"></i>
                            {formattedDate}
                        </p>
                        <p>
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {evento.location}
                        </p>
                    </div>

                    {/* --- IMAGEN ILUSTRATIVA --- */}
                    <img 
                        src={evento.image_url} 
                        className="img-fluid rounded shadow-sm mb-4" 
                        alt={evento.title} 
                        style={{ 
                            width: '100%', 
                            maxHeight: '500px', 
                            objectFit: 'cover' 
                        }}
                    />
                    
                    {/* --- DESCRIPCIÓN COMPLETA --- */}
                    <div className="project-description" style={{ lineHeight: '1.8' }}>
                        <p>{evento.description}</p>
                    </div>
                   <hr className="my-5" />
                    <InscripcionForm eventoId={evento.id} />
                </div>
                </div>
            </div>
    );
};

export default EventoDetalle;