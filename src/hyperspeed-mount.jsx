import React, { useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import Hyperspeed from './components/Hyperspeed/Hyperspeed.jsx'

function Background() {
  const hyperspeedOptions = useMemo(() => ({
    distortion: "turbulentDistortion",
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [12, 80],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131313,
      brokenLines: 0x131313,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  }), []);

  return (
    <div style={{ backgroundColor: '#000000', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -50 }}>
      <Hyperspeed effectOptions={hyperspeedOptions} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('hyperspeed-root')).render(
  <React.StrictMode>
    <Background />
  </React.StrictMode>,
)
