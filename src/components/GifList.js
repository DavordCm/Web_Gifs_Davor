import React from 'react';
import { Grid, Typography } from '@mui/material';

function GifList({ gifs }) {
  return (
    <Grid container spacing={2}>
      {gifs.map((gif) => (
        <Grid item xs={12} sm={6} md={3} key={gif.id}>
          <img
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <Typography variant="body2" align="center" sx={{ marginTop: '8px' }}>
            {gif.title || 'GIF'}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default GifList;
