import React, { useState, useEffect } from 'react';
import GifList from './GifList';

function GifSearch() {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'ZO0q4cotnGUGLk3s35gm1jq39lJCaHxh';

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=32&rating=g`
        );
        const { data } = await response.json();
        setGifs(data);
        setError('');
      } catch (err) {
        setError('Error al cargar los GIFs populares.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGifs();
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=32&rating=g`
      );
      const { data } = await response.json();
      setGifs(data);
      setError('');
    } catch (err) {
      setError('Error al buscar los GIFs.');
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    'div',
    { className: 'Gif-search-container' },
    React.createElement('h1', { className: 'Gif-search-title' }, 'Explora GIFs'),
    React.createElement(
      'div',
      { className: 'Gif-search-bar' },
      React.createElement('input', {
        type: 'text',
        className: 'Gif-search-input',
        placeholder: 'Busca GIFs aquí...',
        value: query,
        onChange: (e) => setQuery(e.target.value),
      }),
      React.createElement(
        'button',
        { className: 'Gif-search-button', onClick: handleSearch },
        'Buscar'
      )
    ),
    loading
      ? React.createElement('p', { className: 'Gif-loading' }, 'Cargando...')
      : error
      ? React.createElement('p', { className: 'Gif-error' }, error)
      : React.createElement(GifList, { gifs })
  );
}

export default GifSearch;
