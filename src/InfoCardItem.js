// InfoCardItem.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // ⬅️ 1. Importa el hook de autenticación

const InfoCardItem = ({ id, title, description, imageUrl, onDelete, onEdit }) => {
  const { isAuthenticated } = useAuth(); // ⬅️ 2. Obtén el estado de autenticación

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImageUrl, setEditImageUrl] = useState(imageUrl);

  const handleSave = () => {
    onEdit(id, {
      title: editTitle,
      description: editDescription,
      image_url: editImageUrl,
    });
    setIsEditing(false);
  };

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      {isEditing ? (
        // El formulario de edición solo puede aparecer si el usuario ya está autenticado
        // y ha hecho clic en "Editar", por lo que no necesita cambios.
        <div className="card-body">
          <input className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <textarea className="form-control mb-2" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <input className="form-control mb-2" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        // Este es el modo de visualización que ven todos
        <>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            
            {/* ⬇️ 3. Condición para mostrar los botones de acción */}
            {isAuthenticated && (
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>Eliminar</button>
              </div>
            )}
            
          </div>
        </>
      )}
    </div>
  );
};

export default InfoCardItem;