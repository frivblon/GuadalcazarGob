// InfoCard.js

import React, { useState, useEffect } from 'react';
import InfoCardList from './InfoCardList';
import InfoCardForm from './InfoCardForm';
import apiClient from './apiClient';
import { useAuth } from './AuthContext'; // 


const InfoCard = () => {
  const { isAuthenticated } = useAuth(); // 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInfocards = async () => {
      try {
        const response = await apiClient.get('/api/infocards');
        setItems(response.data);
      } catch (error) {
        console.error('Error al obtener las infocards:', error);
      }
    };
    fetchInfocards();
  }, []);

 const handleAddCard = async (formData) => { 
    try {
      // apiClient detecta que le estás pasando FormData y automáticamente
      // configura la petición como 'multipart/form-data'. ¡Es así de fácil!
      const response = await apiClient.post('/api/infocards', formData);
      
      // Añadimos el nuevo item (que viene del backend con la URL ya procesada) a la lista
      setItems([...items, response.data]);
    } catch (error) {
   console.error('Error al agregar infocard:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/infocards/${id}`); // <- Usa apiClient
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error al eliminar infocard:', error);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      const response = await apiClient.put(`/api/infocards/${id}`, updatedItem); // <- Usa apiClient
      setItems(items.map(item => item.id === id ? response.data : item));
    } catch (error) {
      console.error('Error al editar infocard:', error);
    }
  };

 return (
    <div className="info-section container my-5">
      <h2 className="text-center mb-4">Funcionarios</h2>

      {isAuthenticated && <InfoCardForm onAdd={handleAddCard} />}

      <InfoCardList items={items} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};


export default InfoCard;