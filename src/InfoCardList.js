// InfoCardList.jsx
import React from 'react';
import InfoCardItem from './InfoCardItem';

const InfoCardList = ({ items, onDelete, onEdit }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {items.map((item) => (
      // ⬇️ La corrección está aquí. Pasamos las props explícitamente.
      <InfoCardItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        // Le decimos al componente hijo que su prop "imageUrl" (camelCase)
        // debe tomar el valor de "item.image_url" (snake_case) del API.
        imageUrl={item.image_url}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default InfoCardList;