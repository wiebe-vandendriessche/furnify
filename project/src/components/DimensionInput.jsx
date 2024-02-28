import React from 'react'
import { useDimensions } from './contexts/DimensionContext';


const DimensionInput = () => {
    const { width, setWidth, height, setHeight, depth, setDepth } = useDimensions();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Width: ${width}, Height: ${height}, depth: ${depth}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="width">Width:</label>
                <input
                    type="number"
                    id="width"
                    name="width"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    required
                />

                <label htmlFor="height">Height:</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    required
                />

                <label htmlFor="depth">depth:</label>
                <input
                    type="number"
                    id="depth"
                    name="depth"
                    value={depth}
                    onChange={(e) => setdepth(Number(e.target.value))}
                    required
                />

                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default DimensionInput