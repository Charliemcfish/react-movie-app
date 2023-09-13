import React, { useEffect, useState } from 'react';
import './TitleOverlay.css';

const TitleOverlay = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // After 3 seconds, hide the overlay
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return isVisible ? <div className="title-overlay"></div> : null;
};

export default TitleOverlay;
