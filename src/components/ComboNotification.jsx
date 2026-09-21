import React, { useEffect, useState } from 'react';

export default function ComboNotification({ comboData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!comboData) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1150);
    return () => clearTimeout(timer);
  }, [comboData]);

  if (!visible || !comboData) return null;

  return (
    <div className="combo-popup-container">
      <div className="combo-badge">
        {comboData.title}
      </div>
      {comboData.bonusPoints > 0 && (
        <div className="combo-score-bonus">
          +{comboData.bonusPoints}
        </div>
      )}
    </div>
  );
}
