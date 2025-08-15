// src/components/AdminInscripciones.jsx

import React, { useState, useEffect } from 'react';
import apiClient from './apiClient';

const AdminInscripciones = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInscripciones = async () => {
            try {
                const response = await apiClient.get('/api/admin/inscripciones');
                setInscripciones(response.data);
            } catch (error) {
                console.error("Error al cargar las inscripciones:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInscripciones();
    }, []);

    // Agrupamos las inscripciones por evento para mostrarlas de forma ordenada
    const groupedInscriptions = inscripciones.reduce((acc, inscription) => {
        const eventTitle = inscription.evento_deportivo?.title || 'Evento Desconocido';
        if (!acc[eventTitle]) {
            acc[eventTitle] = [];
        }
        acc[eventTitle].push(inscription);
        return acc;
    }, {});

    if (loading) {
        return <div className="text-center my-5">Cargando inscripciones...</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Lista de Inscritos por Evento</h1>

            {Object.keys(groupedInscriptions).length === 0 ? (
                <p className="text-center">Aún no hay ninguna inscripción.</p>
            ) : (
                Object.keys(groupedInscriptions).map(eventTitle => (
                    <div key={eventTitle} className="card mb-4">
                        <div className="card-header">
                            <h3>{eventTitle}</h3>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre Completo</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedInscriptions[eventTitle].map((inscription, index) => (
                                        <tr key={inscription.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{inscription.full_name}</td>
                                            <td>{inscription.email}</td>
                                            <td>{inscription.phone_number || 'No proporcionado'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminInscripciones;