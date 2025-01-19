import React from 'react';
import './App.css'; // Ruta del archivo CSS
import GifSearch from './components/GifSearch';

function App() {
  return React.createElement(
    'div',
    { className: 'App' },
    React.createElement(GifSearch)
  );
}

export default App;

