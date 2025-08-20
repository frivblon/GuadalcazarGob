// src/components/DesarrolloSocial.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from './apiClient';

const DesarrolloSocial = () => {
    const [programas, setProgramas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/api/programas-sociales')
            .then(res => setProgramas(res.data))
            .catch(err => console.error("Error cargando programas:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center my-5">Cargando programas sociales...</p>;

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4">Desarrollo Social</h1>
                <p className="lead text-muted">Programas y apoyos para el bienestar de las familias de Guadalcázar.</p>
            </div>
            <div className="row g-4">
                {programas.map(programa => (
                    <div key={programa.id} className="col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm">
                            <img src={programa.image_url} className="card-img-top" alt={programa.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{programa.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{programa.target_population}</h6>
                                <p className="card-text flex-grow-1 truncate-text">{programa.description}</p>
                                <Link to={`/desarrollo-social/${programa.id}`} className="btn btn-outline-primary mt-auto align-self-start">Conocer más</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DesarrolloSocial;