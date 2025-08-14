// src/components/AdminProyectos.jsx

import React, { useState, useEffect } from 'react';
import apiClient from './apiClient';

const AdminProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // Efecto para cargar los proyectos al montar el componente
    useEffect(() => {
        apiClient.get('/api/proyectos').then(response => {
            setProyectos(response.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('icon', icon);
        formData.append('image', imageFile);

        try {
            const response = await apiClient.post('/api/proyectos', formData);
            setProyectos([response.data, ...proyectos]); // Añade el nuevo proyecto al inicio
            // Limpiar formulario
            setTitle('');
            setDescription('');
            setIcon('');
            setImageFile(null);
            e.target.reset();
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
            alert('Hubo un error al crear el proyecto.');
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
            try {
                await apiClient.delete(`/api/proyectos/${id}`);
                setProyectos(proyectos.filter(p => p.id !== id));
            } catch (error) {
                console.error('Error al eliminar el proyecto:', error);
                alert('Hubo un error al eliminar el proyecto.');
            }
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Administrar Proyectos de Obras Públicas</h1>

            {/* --- Formulario para agregar nuevos proyectos --- */}
            <form onSubmit={handleSubmit} className="card p-4 mb-5">
                <h3>Agregar Nuevo Proyecto</h3>
                {/* Inputs para title, description, icon y el file input para la imagen */}
                 <div className="mb-3">
                    <label>Título</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Icono (Ej: fas fa-road)</label>
                    <input type="text" className="form-control" value={icon} onChange={e => setIcon(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Imagen</label>
                    <input type="file" className="form-control" onChange={e => setImageFile(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Proyecto</button>
            </form>

            {/* --- Lista de proyectos existentes --- */}
            <h2>Proyectos Existentes</h2>
            <ul className="list-group">
                {proyectos.map(proyecto => (
                    <li key={proyecto.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={proyecto.image_url} alt={proyecto.title} width="60" className="me-3" />
                            <strong>{proyecto.title}</strong>
                        </div>
                        <div>
                            {/* Aquí podrías agregar un botón de Editar que abra un modal o un formulario de edición */}
                            <button onClick={() => handleDelete(proyecto.id)} className="btn btn-danger btn-sm">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProyectos;