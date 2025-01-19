import React from 'react';
import './App.css'; // Si tienes estilos globales
import GifSearch from './components/GifSearch'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <div className="App">
      <GifSearch /> {/* Aquí usamos el componente GifSearch */}
    </div>
  );
}

export default App;
