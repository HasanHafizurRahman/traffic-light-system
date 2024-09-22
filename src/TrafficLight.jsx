import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = () => {
  const initialDurations = {
    red: 10,
    yellow: 5,
    green: 15
  }
  const [currentLight, setCurrentLight] = useState('green');
  const [redDuration, setRedDuration] = useState(initialDurations.red);
  const [yellowDuration, setYellowDuration] = useState(initialDurations.yellow);
  const [greenDuration, setGreenDuration] = useState(initialDurations.green);
  const [timer, setTimer] = useState(initialDurations.red);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the timer every second
      setTimer((prev) => prev - 1);
    }, 1000);

    // Switch lights based on the current timer value
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

    // Cleanup interval on component unmount
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

  // Function to increase the timer by a user-specified value
  const increaseTimer = (seconds) => {
    switch (currentLight) {
      case 'red':
        setRedDuration(redDuration + seconds);
        setTimer(timer + seconds);
        break;
      case 'yellow':
        setYellowDuration(yellowDuration + seconds);
        setTimer(timer + seconds);
        break;
      case 'green':
        setGreenDuration(greenDuration + seconds);
        setTimer(timer + seconds);
        break;
      default:
        break;
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
        <input
          type="number"
          placeholder="Enter seconds to add"
          id="time-input"
        />
        <button
          onClick={() =>
            increaseTimer(Number(document.getElementById('time-input').value))
          }
        >
          Add Time
        </button>
      </div>
    </div>
  );
};

export default TrafficLight;