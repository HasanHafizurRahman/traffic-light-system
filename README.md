# Traffic Light System

This is a simple Traffic Light System built using **ReactJS** with **Vite** as the bundler. The system cycles through Red, Yellow, and Green lights with specified durations, and also allows manual activation of any light. Additionally, users can increase the duration of any light individually by adding custom time in seconds.

## Features
- Automatically cycles through traffic lights: Red → Green → Yellow.
- Predefined durations:
  - **Red**: 10 seconds
  - **Yellow**: 5 seconds
  - **Green**: 15 seconds
- Manual control to activate each light.
- Option to increase the duration of any light (Red, Yellow, Green) individually by a user-defined number of seconds.

## Prerequisites
- Node.js (>= 12.x.x)
- npm (>= 6.x.x) or yarn

## Installation

To set up this project locally, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/traffic-light-system.git
   cd traffic-light-system
   ```

2. **Install dependencies**:
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

   or if you're using yarn:
   ```bash
   yarn install
   ```

3. **Run the project**:
   After installation, start the Vite development server:
   ```bash
   npm run dev
   ```

   or for yarn:
   ```bash
   yarn dev
   ```

4. **Access the app**:
   Open your browser and navigate to the local development URL (usually `http://localhost:5173`) provided by Vite to see the traffic light system in action.

## Project Structure

```
traffic-light-system/
│
├── public/                     # Public folder for static files
│   └── index.html
│
├── src/                        # Main source folder
│   ├── App.jsx                 # Main app component
│   ├── TrafficLight.jsx         # Traffic Light component
│   ├── TrafficLight.css        # CSS file for styling the lights
│   ├── main.jsx                # Main entry point
│   └── index.css               # Global CSS (optional)
│
├── package.json                # Project metadata and dependencies
└── README.md                   # This file
```

## Code Explanation

### Entry Point: `main.jsx`
Since you're using **Vite**, the entry point of the application is `main.jsx`. This file renders the `App` component into the DOM:

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Traffic Light Component
The `TrafficLight` component is responsible for handling the logic of light transitions and timers. This component is imported and used inside the `App.jsx` file.

#### Traffic Light Code (`TrafficLight.jsx`):

```jsx
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
```

### App Component (`App.jsx`)
The `App.jsx` file imports the `TrafficLight` component and renders it:

```jsx
// src/App.jsx
import React from 'react';
import TrafficLight from './TrafficLight';

const App = () => {
  return (
    <div>
      <TrafficLight />
    </div>
  );
};

export default App;
```

### CSS Styling
Each light (Red, Yellow, Green) has a corresponding CSS class to change its color. The lights are styled in a vertical layout, simulating a real traffic light:

```css
/* src/TrafficLight.css */
.traffic-light {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 200px;
  width: 100px;
  background-color: #333;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

.light {
  height: 50px;
  width: 50px;
  background-color: #666;
  border-radius: 50%;
}

.light.red {
  background-color: red;
}

.light.yellow {
  background-color: yellow;
}

.light

