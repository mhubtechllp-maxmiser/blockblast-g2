import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';

export default function RotationWarning() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if width > height and max-height is phone-like (< 600px)
      const isLand = window.innerWidth > window.innerHeight && window.innerHeight < 600;
      setIsLandscape(isLand);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isLandscape) return null;

  return (
    <div className="rotation-warning-overlay">
      <div className="rotation-icon">
        <Smartphone size={56} />
      </div>
      <h2 className="warning-heading">ROTATE YOUR DEVICE</h2>
      <p className="warning-body">
        NEON BLOCKS IS DESIGNED SPECIFICALLY FOR MOBILE PORTRAIT ORIENTATION.
      </p>
    </div>
  );
}
