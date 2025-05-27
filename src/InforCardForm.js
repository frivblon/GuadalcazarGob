// src/components/InfoCardForm.jsx
import React, { useState } from 'react';

const InfoCardForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !imageUrl) return;

    onAdd({
      id: Date.now(),
      title,
      description,
      imageUrl,
    });

    // Limpia el formulario
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form className="info-form" onSubmit={handleSubmit}>
      <h2>Agregar nuevo servicio</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default InfoCardForm;
