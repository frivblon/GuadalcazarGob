// InfoCardItem.jsx
import React, { useState } from 'react';

const InfoCardItem = ({ id, title, description, imageUrl, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editImageUrl, setEditImageUrl] = useState(imageUrl);

  const handleSave = () => {
    onEdit(id, {
      title: editTitle,
      description: editDescription,
      imageUrl: editImageUrl,
    });
    setIsEditing(false);
  };

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      {isEditing ? (
        <div className="card-body">
          <input className="form-control mb-2" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <textarea className="form-control mb-2" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
          <input className="form-control mb-2" value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <img src={imageUrl} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <button className="btn btn-primary btn-sm me-2" onClick={() => setIsEditing(true)}>Editar</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default InfoCardItem;
