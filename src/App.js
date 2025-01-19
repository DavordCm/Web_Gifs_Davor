import React, { useState, useEffect } from 'react';

function App() {
  const [gifs, setGifs] = useState([]);
  const API_KEY = 'ZO0q4cotnGUGLk3s35gm1jq39lJCaHxh';
  const searchTerm = 'funny cats';

  useEffect(() => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10&rating=g`)
      .then((response) => response.json())
      .then((data) => {
        setGifs(data.data); // Guardamos los GIFs en el estado
      })
      .catch((error) => console.error('Error fetching GIFs:', error));
  }, []);

  return (
    <div>
      <h1>Busqueda de Gifs</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
