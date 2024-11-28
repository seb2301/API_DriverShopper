import React, { useState } from 'react';
import axios from 'axios';

const RideHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [rides, setRides] = useState<any[]>([]);

  const handleGetHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/ride/${customerId}`);
      setRides(response.data.rides);
    } catch (error) {
      console.error('Erro ao obter histórico de viagens:', error);
      alert('Erro ao obter histórico de viagens. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <h2>Histórico de Viagens</h2>
      <input
        type="text"
        placeholder="ID do Cliente"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={handleGetHistory}>Obter Histórico</button>

      {rides.length > 0 && (
        <div>
          {rides.map((ride) => (
            <div key={ride.id}>
              <p>Data: {new Date(ride.date).toLocaleString()}</p>
              <p>Motorista: {ride.driver.name}</p>
              <p>Origem: {ride.origin}</p>
              <p>Destino: {ride.destination}</p>
              <p>Distância: {ride.distance} km</p>
              <p>Tempo: {ride.duration}</p>
              <p>Valor: R$ {ride.value.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;