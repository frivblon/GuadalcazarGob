// src/components/InscripcionForm.jsx

import React, { useState } from 'react';
import apiClient from './apiClient';

const InscripcionForm = ({ eventoId }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await apiClient.post('/api/inscripciones', {
                evento_deportivo_id: eventoId,
                full_name: fullName,
                email: email,
                phone_number: phoneNumber,
            });
            setMessage(response.data.message);
            // Limpiar formulario
            setFullName('');
            setEmail('');
            setPhoneNumber('');
        } catch (err) {
            setError('Hubo un error al enviar tu inscripción. Por favor, intenta de nuevo.');
            console.error(err);
        }
    };

    if (message) {
        return (
            <div className="alert alert-success text-center">
                <h4>¡Gracias!</h4>
                <p>{message}</p>
            </div>
        );
    }

    return (
        <div className="card bg-light border-0 mt-5">
            <div className="card-body p-4">
                <h3 className="card-title text-center mb-4">Inscríbete a este Evento</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Teléfono (Opcional)</label>
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Enviar Inscripción</button>
                </form>
            </div>
        </div>
    );
};

export default InscripcionForm;