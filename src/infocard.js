// InfoCard.js

import React, { useState, useEffect } from 'react';
import InfoCardList from './InfoCardList';
import InfoCardForm from './InfoCardForm';
// ⬇️ PASO 1: Importa tu nuevo cliente API en lugar de 'axios'
import apiClient from './apiClient';
import { useAuth } from './AuthContext'; // ⬅️ 1. Importa el hook


const InfoCard = () => {
  const { isAuthenticated } = useAuth(); // ⬅️ 2. Obtén el estado de autenticación
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchInfocards = async () => {
      try {
        // ⬇️ PASO 2: Usa apiClient para todas las peticiones
        const response = await apiClient.get('/api/infocards');
        setItems(response.data);
      } catch (error) {
        console.error('Error al obtener las infocards:', error);
      }
    };
    fetchInfocards();
  }, []);

 const handleAddCard = async (formData) => { // ⬅️ Ahora recibe el objeto FormData
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
      <h2 className="text-center mb-4">Nuestros Servicios</h2>

      {/* ⬇️ 3. Renderizado Condicional del Formulario */}
      {/* Esto se lee como: "SI isAuthenticated es true, ENTONCES renderiza InfoCardForm" */}
      {isAuthenticated && <InfoCardForm onAdd={handleAddCard} />}

      <InfoCardList items={items} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};


export default InfoCard;