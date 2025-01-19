import React from 'react';

function GifList({ gifs }) {
  return React.createElement(
    'div',
    { className: 'Gif-list-container' },
    gifs.map((gif) =>
      React.createElement(
        'div',
        { className: 'Gif-card', key: gif.id },
        React.createElement('img', {
          src: gif.images.fixed_height.url,
          alt: gif.title,
          className: 'Gif-image',
        }),
        React.createElement('p', { className: 'Gif-title' }, gif.title || 'GIF')
      )
    )
  );
}

export default GifList;
