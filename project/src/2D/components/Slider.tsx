import React, { useState } from 'react';

export function SliderComponent({ gridSize, setgridSize }) {
  // Initialize state with the default value of the slider
//   const [gridSize, setgridSize] = useState(50);

  // Handle changing the slider
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setgridSize(newValue);  // Update the state with the new slider value
    console.log("Slider value:", newValue);  // Log the current value
  };

  return (
    <div>
      <input
        className="slider"
        type="range"
        min="0"
        max="10"
        step="0.01"
        value={gridSize}  // Bind the slider's value to the component's state
        onChange={handleSliderChange}  // Set the method to call on value change
      />
      <div>Value: {gridSize}</div>
    </div>
  );
}
