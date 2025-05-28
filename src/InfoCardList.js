// InfoCardList.jsx
import React from 'react';
import InfoCardItem from './InfoCardItem';

const InfoCardList = ({ items, onDelete, onEdit }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {items.map((item) => (
      <InfoCardItem
        key={item.id}
        {...item}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default InfoCardList;
