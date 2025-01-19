import React, { useState } from 'react';

function GifSearch() {
  const [query, setQuery] = useState(''); // Estado para la búsqueda
  const [gifs, setGifs] = useState([]); // Estado para los resultados

  const API_KEY = 'ZO0q4cotnGUGLk3s35gm1jq39lJCaHxh'; // La API Key de Giphy

  const handleSearch = async () => {
    if (!query) return; // Si la búsqueda está vacía, no hacemos nada
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data); // Guardamos los GIFs en el estado
    } catch (error) {
      console.error('Error al buscar los GIFs:', error);
    }
  };

  return (
    <div>
      <h2>Búsqueda de GIFs</h2>
      <div>
        <input
          type="text"
          placeholder="Escribe algo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Actualizamos el estado con el valor ingresado
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ width: '200px', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default GifSearch;
