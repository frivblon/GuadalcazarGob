// src/components/AdminEventos.jsx

import React, { useState, useEffect } from 'react';
import apiClient from './apiClient';

const AdminEventos = () => {
    const [eventos, setEventos] = useState([]);
    // Estados para el formulario
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [event_date, setEventDate] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // Cargar eventos al iniciar
    useEffect(() => {
        apiClient.get('/api/evento-deportivos')
            .then(res => setEventos(res.data))
            .catch(err => console.error("Error cargando eventos:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('event_date', event_date);
        formData.append('image', imageFile);

        try {
            const response = await apiClient.post('/api/evento-deportivos', formData);
            setEventos([response.data, ...eventos]);
            // Limpiar formulario
            setTitle('');
            setDescription('');
            setLocation('');
            setEventDate('');
            setImageFile(null);
            e.target.reset();
        } catch (error) {
            console.error('Error al crear el evento:', error.response?.data);
            alert('Error al crear el evento. Revisa la consola.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                await apiClient.delete(`/api/evento-deportivos/${id}`);
                setEventos(eventos.filter(e => e.id !== id));
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
                alert('Hubo un error al eliminar el evento.');
            }
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Administrar Eventos Deportivos</h1>
            {/* --- Formulario para agregar nuevos eventos --- */}
            <form onSubmit={handleSubmit} className="card p-4 mb-5">
                <h3>Agregar Nuevo Evento</h3>
                <div className="mb-3">
                    <label>Título</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Lugar</label>
                        <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Fecha del Evento</label>
                        <input type="date" className="form-control" value={event_date} onChange={e => setEventDate(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <label>Imagen</label>
                    <input type="file" className="form-control" onChange={e => setImageFile(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Evento</button>
            </form>

            {/* --- Lista de eventos existentes --- */}
            <h2>Eventos Existentes</h2>
            <ul className="list-group">
                {eventos.map(evento => (
                    <li key={evento.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={evento.image_url} alt={evento.title} width="60" className="me-3" />
                            <strong>{evento.title}</strong>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(evento.id)} className="btn btn-danger btn-sm">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminEventos;