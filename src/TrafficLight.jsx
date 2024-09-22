import React, { useState, useEffect } from 'react';
import './TrafficLight.css'; // Include basic CSS for styling

const TrafficLight = () => {
  // Define initial durations for each light in seconds
  const initialDurations = {
    red: 10,
    yellow: 5,
    green: 15,
  };

  const [currentLight, setCurrentLight] = useState('red');
  const [redDuration, setRedDuration] = useState(initialDurations.red);
  const [yellowDuration, setYellowDuration] = useState(initialDurations.yellow);
  const [greenDuration, setGreenDuration] = useState(initialDurations.green);
  const [timer, setTimer] = useState(initialDurations.red);

  // State to handle additional time for each light
  const [redExtraTime, setRedExtraTime] = useState(0);
  const [yellowExtraTime, setYellowExtraTime] = useState(0);
  const [greenExtraTime, setGreenExtraTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // Switch lights when the timer reaches 0
    if (timer === 0) {
      switch (currentLight) {
        case 'red':
          setCurrentLight('green');
          setTimer(greenDuration);
          break;
        case 'green':
          setCurrentLight('yellow');
          setTimer(yellowDuration);
          break;
        case 'yellow':
          setCurrentLight('red');
          setTimer(redDuration);
          break;
        default:
          break;
      }
    }

    return () => clearInterval(interval);
  }, [timer, currentLight, redDuration, yellowDuration, greenDuration]);

  // Manual activation functions for each light
  const activateRed = () => {
    setCurrentLight('red');
    setTimer(redDuration);
  };

  const activateYellow = () => {
    setCurrentLight('yellow');
    setTimer(yellowDuration);
  };

  const activateGreen = () => {
    setCurrentLight('green');
    setTimer(greenDuration);
  };

  // Functions to increase the timer for each light individually
  const increaseRedTime = () => {
    const additionalTime = Number(redExtraTime);
    if (additionalTime > 0) {
      setRedDuration(redDuration + additionalTime);
      if (currentLight === 'red') setTimer(timer + additionalTime);
    }
  };

  const increaseYellowTime = () => {
    const additionalTime = Number(yellowExtraTime);
    if (additionalTime > 0) {
      setYellowDuration(yellowDuration + additionalTime);
      if (currentLight === 'yellow') setTimer(timer + additionalTime);
    }
  };

  const increaseGreenTime = () => {
    const additionalTime = Number(greenExtraTime);
    if (additionalTime > 0) {
      setGreenDuration(greenDuration + additionalTime);
      if (currentLight === 'green') setTimer(timer + additionalTime);
    }
  };

  return (
    <div>
      <h1>Traffic Light System</h1>
      <div className="traffic-light">
        <div className={`light ${currentLight === 'red' ? 'red' : ''}`}></div>
        <div className={`light ${currentLight === 'yellow' ? 'yellow' : ''}`}></div>
        <div className={`light ${currentLight === 'green' ? 'green' : ''}`}></div>
      </div>
      <p>Current light: {currentLight.toUpperCase()}</p>
      <p>Time remaining: {timer}s</p>

      <div>
        <button onClick={activateRed}>Activate Red</button>
        <button onClick={activateYellow}>Activate Yellow</button>
        <button onClick={activateGreen}>Activate Green</button>
      </div>

      <div>
        <h3>Increase Time for Red</h3>
        <input
          type="number"
          placeholder="Enter seconds to add"
          value={redExtraTime}
          onChange={(e) => setRedExtraTime(e.target.value)}
        />
        <button onClick={increaseRedTime}>Add Time to Red</button>
      </div>

      <div>
        <h3>Increase Time for Yellow</h3>
        <input
          type="number"
          placeholder="Enter seconds to add"
          value={yellowExtraTime}
          onChange={(e) => setYellowExtraTime(e.target.value)}
        />
        <button onClick={increaseYellowTime}>Add Time to Yellow</button>
      </div>

      <div>
        <h3>Increase Time for Green</h3>
        <input
          type="number"
          placeholder="Enter seconds to add"
          value={greenExtraTime}
          onChange={(e) => setGreenExtraTime(e.target.value)}
        />
        <button onClick={increaseGreenTime}>Add Time to Green</button>
      </div>
    </div>
  );
};

export default TrafficLight;
