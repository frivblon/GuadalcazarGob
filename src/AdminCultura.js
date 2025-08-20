import React, { useState, useEffect } from 'react';
import apiClient from './apiClient';

const AdminCultura = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estados para el formulario de creación
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [event_date, setEventDate] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // Función para obtener todas las noticias de la API
    const fetchNoticias = async () => {
        try {
            const response = await apiClient.get('/api/noticias-culturales');
            setNoticias(response.data);
        } catch (error) {
            console.error("Error al cargar las noticias:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect para llamar a fetchNoticias cuando el componente se carga
    useEffect(() => {
        fetchNoticias();
    }, []);

    // Manejador para el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('event_date', event_date);
        formData.append('image', imageFile);

        try {
            const response = await apiClient.post('/api/noticias-culturales', formData);
            setNoticias([response.data, ...noticias]); // Agrega la nueva noticia al inicio de la lista
            
            // Limpiar el formulario
            setTitle('');
            setDescription('');
            setLocation('');
            setEventDate('');
            setImageFile(null);
            e.target.reset(); // Resetea el input de tipo 'file'
        } catch (error) {
            console.error('Error al crear la noticia:', error.response?.data);
            alert('Error al crear la noticia. Revisa la consola para más detalles.');
        }
    };

    // Manejador para eliminar una noticia
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta noticia?')) {
            try {
                await apiClient.delete(`/api/noticias-culturales/${id}`);
                setNoticias(noticias.filter(noticia => noticia.id !== id)); // Actualiza la lista en el UI
            } catch (error) {
                console.error('Error al eliminar la noticia:', error);
                alert('Hubo un error al eliminar la noticia.');
            }
        }
    };

    if (loading) {
        return <div className="container my-5 text-center">Cargando datos...</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Administrar Contenido Cultural</h1>

            <form onSubmit={handleSubmit} className="card p-4 mb-5 shadow-sm">
                <h3>Agregar Nueva Noticia o Evento</h3>
                <div className="mb-3">
                    <label className="form-label">Título</label>
                    {/* ⬇️ CORRECCIÓN: Conecta el 'value' al estado 'title' ⬇️ */}
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    {/* ⬇️ CORRECCIÓN: Conecta el 'value' al estado 'description' ⬇️ */}
                    <textarea className="form-control" rows="3" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Lugar (Opcional)</label>
                      
                        <input type="text" className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Fecha del Evento (Opcional)</label>
                       
                        <input type="date" className="form-control" value={event_date} onChange={e => setEventDate(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="file" className="form-control" onChange={e => setImageFile(e.target.files[0])} required />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Noticia</button>
            </form>

            {/* --- Lista del Contenido Existente --- */}
            <h2>Contenido Cultural Existente</h2>
            <ul className="list-group">
                {noticias.map(noticia => (
                    <li key={noticia.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <img src={noticia.image_url} alt={noticia.title} width="80" className="me-3 rounded" />
                            <div>
                                <strong>{noticia.title}</strong>
                                <p className="mb-0 text-muted">{noticia.location}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(noticia.id)} className="btn btn-danger btn-sm">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminCultura;