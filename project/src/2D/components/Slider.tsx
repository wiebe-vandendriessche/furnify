import React, { useState } from 'react';

export function SliderComponent({ gridSize, setgridSize }) {
  // Initialize state with the default value of the slider
  // const [gridSize, setgridSize] = useState(50);

  // Handle changing the slider
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setgridSize(newValue);  // Update the state with the new slider value
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '0px 0px 0px 10px'}}>
      <input
        className="slider"
        type="range"
        min="0.01"
        max="1"
        step="0.01"
        value={gridSize}  // Bind the slider's value to the component's state
        onChange={handleSliderChange}  // Set the method to call on value change
      />
      <div style={{margin: '0px 0px 0px 10px'}}>Grid size: {gridSize}m</div>
    </div>
  );
}
