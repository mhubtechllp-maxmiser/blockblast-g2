import React, { useMemo } from 'react';

export default function BackgroundFX() {
  // Generate random motes with fixed seeds for consistency
  const motes = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      top: `${(i * 19) % 95}%`,
      left: `${(i * 37) % 95}%`,
      delay: `${(i * 0.4) % 4}s`,
      duration: `${4 + ((i * 0.7) % 4)}s`,
      size: `${1.5 + (i % 3) * 0.8}px`
    }));
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="bg-radial-1" />
      <div className="bg-radial-2" />
      <div className="bg-grid-mesh" />
      <div className="floating-motes">
        {motes.map((m) => (
          <span
            key={m.id}
            className="mote"
            style={{
              top: m.top,
              left: m.left,
              width: m.size,
              height: m.size,
              animationDelay: m.delay,
              animationDuration: m.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}
