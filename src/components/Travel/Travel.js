import React, { useState, useEffect } from 'react'


function Travel() {
  const [timeOnGoogleMaps, setTimeOnGoogleMaps] = useState(0);

  useEffect(() => {
    const storedTime = localStorage.getItem('googleMapsTime');
    setTimeOnGoogleMaps(storedTime ? parseFloat(storedTime) : 0);
  }, []);

  return (
    <div>
      <div>Travel</div>
      <div>Mingkuan has spent {timeOnGoogleMaps.toFixed(6)} hours surfing Google Maps.</div>
    </div>
  );
};

export default Travel