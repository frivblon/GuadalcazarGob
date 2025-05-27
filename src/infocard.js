// src/components/InfoCard.jsx
import React from 'react';
import './infoCard.css';

const InfoCard = ({ imageUrl, title, description }) => (
  <div className="info-card">
    <img src={imageUrl} alt={title} className="info-card-image" />
    <div className="info-card-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

export default InfoCard;
