import React, { useState } from 'react';

// Defina as props do RideForm, incluindo o tipo da função `onEstimate`
interface RideFormProps {
  onEstimate: (customerId: string, origin: string, destination: string) => void;
}

const RideForm: React.FC<RideFormProps> = ({ onEstimate }) => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEstimate(customerId, origin, destination);
  };

  return (
    <form onSubmit={handleSubmit} className="RideForm">
      <div className="form-container">
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          placeholder="ID do Cliente"
        />
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Endereço de Origem"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Endereço de Destino"
        />
        <button type="submit">Pesquisar Motoristas</button>
      </div>
    </form>
  );
};

export default RideForm;
