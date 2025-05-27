// src/components/InfoCardList.jsx
import React from 'react';
import  InfoCard from './infocard';

const InfoCardList = ({ items }) => (
  <div className="card-grid">
    {items.map((item) => (
      <InfoCard key={item.id} {...item} />
    ))}
  </div>
);

export default InfoCardList;
