import React from 'react';
import './infoCard.css';

const InfoCard = ({ imageUrl, title, description }) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

const App = () => {
  const data = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'ANUNCIA RICARDO GALLARDO RESCATE DE CARRETERA LAGUNILLAS-RAYÓN',
      description: '25 de mayo de 2025, En gira de trabajo por la región Media, el Gobernador del Estado anunció la rehabilitación total de la carretera que durante más de tres décadas permaneció en el abandono.'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'Desarrollo de Software',
      description: 'Creamos soluciones personalizadas en Android y web para tu negocio.',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/400x300',
      title: 'Redes y Cableado',
      description: 'Instalamos redes estructuradas para hogares y oficinas.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Noticias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <InfoCard
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
