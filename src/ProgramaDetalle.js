// src/components/ProgramaDetalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from './apiClient';

const ProgramaDetalle = () => {
    const { id } = useParams(); 
    const [programa, setPrograma] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograma = async () => {
            try {
                const response = await apiClient.get(`/api/programas-sociales/${id}`);
                setPrograma(response.data);
            } catch (error) {
                console.error("Error al obtener el detalle del programa:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograma();
    }, [id]);

    if (loading) return <div className="text-center my-5">Cargando programa...</div>;
    if (!programa) return <div className="text-center my-5">Programa no encontrado.</div>;

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <h1 className="display-5 mb-3">{programa.title}</h1>
                    <img src={programa.image_url} className="img-fluid rounded shadow-sm mb-4" alt={programa.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                    
                    <div className="card bg-light border-0 mb-4">
                        <div className="card-body">
                            <h5 className="card-title">¿A quién va dirigido?</h5>
                            <p className="card-text">{programa.target_population}</p>
                            <hr />
                            <h5 className="card-title mt-3">Requisitos</h5>
                            <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>{programa.requirements}</p>
                        </div>
                    </div>

                    <div className="content-description" style={{ lineHeight: '1.8' }}>
                        <h5>Descripción Completa del Programa</h5>
                        <p>{programa.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramaDetalle;