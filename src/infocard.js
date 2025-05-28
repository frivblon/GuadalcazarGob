// InfoCard.jsx
import React, { useState } from 'react';
import InfoCardList from './InfoCardList';
import InfoCardForm from './InfoCardForm';

const InfoCard = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Mantenimiento',
      description: 'Mantenimiento de computadoras y consolas.',
      imageUrl: 'https://via.placeholder.com/400x200',
    },
    {
      id: 2,
      title: 'Desarrollo',
      description: 'Aplicaciones Android y páginas web.',
      imageUrl: 'https://via.placeholder.com/400x200',
    },
  ]);

  const handleAddCard = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleEdit = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  return (
    <div className="info-section container my-5">
      <h2 className="text-center mb-4">Nuestros Servicios</h2>
      <InfoCardForm onAdd={handleAddCard} />
      <InfoCardList items={items} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default InfoCard;
