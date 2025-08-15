// src/components/Deportes.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from './apiClient';

const Deportes = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await apiClient.get('/api/evento-deportivos');
                setEventos(response.data);
            } catch (error) {
                console.error('Error al obtener los eventos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    if (loading) return <p className="text-center my-5">Cargando eventos...</p>;

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4">Deportes en Guadalcázar</h1>
                <p className="lead text-muted">Resultados, convocatorias y eventos deportivos de nuestro municipio.</p>
            </div>
            <div className="row g-4">
                {eventos.map(evento => (
                    <div key={evento.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src={evento.image_url} className="card-img-top" alt={evento.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{evento.title}</h5>
                                <p className="card-text text-muted">
                                    <i className="fas fa-calendar-alt me-2"></i>
                                    {new Date(evento.event_date).toLocaleDateString('es-MX', { timeZone: 'UTC' })}
                                </p>
                                <p className="card-text text-muted">
                                    <i className="fas fa-map-marker-alt me-2"></i>
                                    {evento.location}
                                </p>
                                <p className="card-text truncate-text">{evento.description}</p>
                                <Link to={`/deportes/${evento.id}`} className="btn btn-outline-primary">Leer más</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Deportes;