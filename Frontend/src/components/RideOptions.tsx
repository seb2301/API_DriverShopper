import React from 'react';

interface RideOptionsProps {
  options: any[];
  onSelect: (option: any) => void;
}

const RideOptions: React.FC<RideOptionsProps> = ({ options, onSelect }) => {
  return (
    <div>
      <h3>Opções de Viagem</h3>
      {options.map((option) => (
        <div key={option.id}>
          <p>Motorista: {option.name}</p>
          <p>Descrição: {option.description}</p>
          <p>Veículo: {option.vehicle}</p>
          <p>Valor: R$ {option.value.toFixed(2)}</p>
          <button onClick={() => onSelect(option)}>Escolher</button>
        </div>
      ))}
    </div>
  );
};

export default RideOptions;