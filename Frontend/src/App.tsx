import React, { useState } from 'react';
import './App.css';
import RideForm from './components/RideForm';
import RideOptions from './components/RideOptions';
import RideHistory from './components/RideHistory';

const App: React.FC = () => {
  const [rideOptions, setRideOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any | null>(null);

  const handleEstimate = async (customerId: string, origin: string, destination: string) => {
    try {
      const response = await fetch('http://localhost:8080/api/ride/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customer_id: customerId, origin, destination })
      });

      if (response.ok) {
        const data = await response.json();
        setRideOptions(data.options);
      } else {
        alert('Erro ao estimar a viagem. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao estimar a viagem:', error);
      alert('Erro ao estimar a viagem. Tente novamente mais tarde.');
    }
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    alert(`Você escolheu o motorista: ${option.name}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
            <img src="/logo.png" alt="Logo da DriverShopper"></img>
        </div>
        <h1>DriverShopper - Encontre seu transporte particular de confiança</h1>
      </header>
      <main>
        <RideForm onEstimate={handleEstimate} />
        {rideOptions.length > 0 && (
          <RideOptions options={rideOptions} onSelect={handleSelectOption} />
        )}
        <RideHistory />
      </main>
      <footer>
        <p>Criado por: Sebastião Soares da Silva Filho</p>
        <p>Contatos:</p>
        <ul>
          <li><a href="https://wa.me/5547999876998" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
          <li><a href="https://www.linkedin.com/in/sebfullstack" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="https://github.com/seb2301" target="_blank" rel="noopener noreferrer">GitHub</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default App;