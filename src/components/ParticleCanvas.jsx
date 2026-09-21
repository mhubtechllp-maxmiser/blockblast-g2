import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const ParticleCanvas = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameIdRef = useRef(null);

  useImperativeHandle(ref, () => ({
    spawnLineParticles(clearedRows, clearedCols, boardRect, cellSize) {
      const newParticles = [];
      const colors = ['#00e5ff', '#2979ff', '#ff2bd6', '#ffffff', '#ffd600'];

      // Spawn particles along cleared rows
      clearedRows.forEach((r) => {
        const y = r * cellSize + cellSize / 2 + 8; // offset for padding
        for (let c = 0; c < 8; c++) {
          const x = c * cellSize + cellSize / 2 + 8;
          // Spawn 6-8 sparks per cell
          for (let p = 0; p < 7; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            newParticles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2 + Math.random() * 3,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 1,
              decay: 0.02 + Math.random() * 0.03,
              spark: Math.random() > 0.4
            });
          }
        }
      });

      // Spawn particles along cleared columns
      clearedCols.forEach((c) => {
        const x = c * cellSize + cellSize / 2 + 8;
        for (let r = 0; r < 8; r++) {
          const y = r * cellSize + cellSize / 2 + 8;
          for (let p = 0; p < 7; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            newParticles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 2 + Math.random() * 3,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 1,
              decay: 0.02 + Math.random() * 0.03,
              spark: Math.random() > 0.4
            });
          }
        }
      });

      particlesRef.current.push(...newParticles);
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let isRunning = true;
    const render = () => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.spark ? 8 : 4;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="board-particles-canvas" />;
});

export default ParticleCanvas;
