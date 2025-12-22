import React from 'react';

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full items-center bg-foreground align-middle">
      <iframe
        src="https://player.vimeo.com/video/362997602?autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1&controls=0&background=1"
        className="pointer-events-none aspect-video h-full w-full object-cover"
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Background Video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      ></iframe>
    </div>
  );
}

