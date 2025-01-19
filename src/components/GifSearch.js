import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
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
        console.error(err);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        GIFs Populares y Búsqueda
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Buscar GIFs"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <GifList gifs={gifs} />
      )}
    </Box>
  );
}

export default GifSearch;
