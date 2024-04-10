import React from 'react'
import { Canvas } from '@react-three/fiber';
import { useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { FloorplanEditor } from './FloorplanEditor'
import { useDrawing } from '../contexts/2dContext'

export const FloorplanScene = () => {
    const { isDrawing, toggleDrawing, drawingCanvasRef } = useDrawing();
    return (
        <Canvas className='canvas' orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <FloorplanEditor />
            <axesHelper />
            {/* <OrbitControls /> */}
          </Canvas>
    )
}

