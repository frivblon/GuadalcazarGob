// src/components/AdminProgramas.jsx
import React, { useState, useEffect } from 'react';
import apiClient from './apiClient';

const AdminProgramas = () => {
    const [programas, setProgramas] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [target_population, setTargetPopulation] = useState('');
    const [requirements, setRequirements] = useState('');
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        apiClient.get('/api/programas-sociales').then(res => setProgramas(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('target_population', target_population);
        formData.append('requirements', requirements);
        formData.append('image', imageFile);

        try {
            const response = await apiClient.post('/api/programas-sociales', formData);
            setProgramas([response.data, ...programas]);
            e.target.reset(); // Limpiar formulario
            // También resetea los estados de texto
            setTitle('');
            setDescription('');
            setTargetPopulation('');
            setRequirements('');
        } catch (error) {
            console.error('Error al crear el programa:', error.response.data);
            alert('Error al crear el programa. Revisa la consola.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este programa?')) {
            try {
                await apiClient.delete(`/api/programas-sociales/${id}`);
                setProgramas(programas.filter(p => p.id !== id));
            } catch (error) {
                console.error('Error al eliminar el programa:', error);
            }
        }
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Administrar Programas Sociales</h1>
            <form onSubmit={handleSubmit} className="card p-4 mb-5">
                <h3>Agregar Nuevo Programa</h3>
                <div className="mb-3">
                    <label>Título del Programa</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Población Objetivo</label>
                    <input type="text" className="form-control" value={target_population} placeholder="Ej: Adultos Mayores, Madres Solteras" onChange={e => setTargetPopulation(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Descripción</label>
                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                 <div className="mb-3">
                    <label>Requisitos</label>
                    <textarea className="form-control" value={requirements} onChange={e => setRequirements(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Imagen</label>
                    <input type="file" className="form-control" onChange={e => setImageFile(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Programa</button>
            </form>

            <h2>Programas Existentes</h2>
            <ul className="list-group">
                {programas.map(programa => (
                    <li key={programa.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <img src={programa.image_url} alt={programa.title} width="80" className="me-3 rounded"/>
                            <strong>{programa.title}</strong>
                        </div>
                        <button onClick={() => handleDelete(programa.id)} className="btn btn-danger btn-sm">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProgramas;