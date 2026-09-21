import React from 'react';
import RotationWarning from './RotationWarning';

export default function MobileContainer({ children }) {
  return (
    <div className="desktop-stage-wrapper">
      <div className="mobile-device-frame">
        <div className="device-notch" />
        <div className="mobile-screen-content">
          {children}
        </div>
      </div>
      <RotationWarning />
    </div>
  );
}
