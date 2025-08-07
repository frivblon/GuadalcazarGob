import React, { useState, useEffect } from 'react';
import InfoCardList from './InfoCardList';
import InfoCardForm from './InfoCardForm';
import axios from 'axios'; // ⬅️ Importa Axios

const InfoCard = () => {
  const [items, setItems] = useState([]); // El estado ahora se llenará desde la API

  useEffect(() => {
    // ⬅️ Función para obtener las infocards desde la API
    const fetchInfocards = async () => {
      try {
        const response = await axios.get('/api/infocards');
        setItems(response.data);
      } catch (error) {
        console.error('Error al obtener las infocards:', error);
        // Manejo de errores: podrías mostrar un mensaje al usuario
      }
    };

    fetchInfocards(); // Llama a la función al montar el componente
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  const handleAddCard = async (newItem) => {
    try {
      const response = await axios.post('/api/infocards', newItem);
      setItems([...items, response.data]); // Agrega la nueva infocard devuelta por el backend
    } catch (error) {
      console.error('Error al agregar infocard:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/infocards/${id}`);
      setItems(items.filter(item => item.id !== id)); // Filtra la infocard eliminada
    } catch (error) {
      console.error('Error al eliminar infocard:', error);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    try {
      const response = await axios.put(`/api/infocards/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item)); // Actualiza la infocard con los datos devueltos
    } catch (error) {
      console.error('Error al editar infocard:', error);
    }
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