import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from './apiClient';

const Cultura = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/api/noticias-culturales')
            .then(res => setNoticias(res.data))
            .catch(err => console.error("Error cargando noticias:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center my-5">Cargando contenido cultural...</p>;

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4">Cultura y Desarrollo Social</h1>
                <p className="lead text-muted">Fomentando las tradiciones y el bienestar en nuestra comunidad.</p>
            </div>
            <div className="row g-4">
                {noticias.map(noticia => (
                    <div key={noticia.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src={noticia.image_url} className="card-img-top" alt={noticia.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{noticia.title}</h5>
                                <p className="card-text text-muted">
                                    <i className="fas fa-calendar-alt me-2"></i>
                                    {new Date(noticia.event_date).toLocaleDateString('es-MX', { timeZone: 'UTC' })}
                                </p>
                                <p className="card-text truncate-text">{noticia.description}</p>
                                <Link to={`/cultura/${noticia.id}`} className="btn btn-outline-primary">Leer más</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cultura;