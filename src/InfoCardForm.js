// src/components/InfoCardForm.jsx
import React, { useState } from 'react';

const InfoCardForm = ({ onAdd }) => {
  // Estados para los campos de texto (estos no cambian)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // ⬇️ 1. Cambiamos el estado 'imageUrl' por uno para guardar el ARCHIVO
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos que todos los campos estén llenos
    if (!title || !description || !imageFile) return;

    // ⬇️ 2. Creamos un objeto FormData para poder enviar el archivo
    const formData = new FormData();

    // 3. Añadimos cada campo. La clave ('image') debe coincidir con la del backend
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile);

    // 4. Pasamos el objeto FormData a la función onAdd del componente padre
    onAdd(formData);

    // Limpiamos el formulario
    setTitle('');
    setDescription('');
    setImageFile(null);
    e.target.reset(); // Esto limpia el input de archivo
  };

  return (
    <form className="info-form card p-3" onSubmit={handleSubmit}>
      <h2 className="text-center mb-4">Agregar nuevo servicio</h2>
      <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Título del servicio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
      </div>
      <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input
            id="description"
            type="text"
            className="form-control"
            placeholder="Descripción del servicio"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
      </div>
      <div className="mb-3">
          <label htmlFor="image" className="form-label">Imagen</label>
          {/* ⬇️ 5. El input ahora es de tipo 'file' */}
          <input
            id="image"
            type="file"
            className="form-control"
            onChange={(e) => setImageFile(e.target.files[0])} // ⬅️ 6. Guardamos el archivo en el estado
            required
          />
      </div>
      <button type="submit" className="btn btn-primary w-100">Agregar</button>
    </form>
  );
};

export default InfoCardForm;