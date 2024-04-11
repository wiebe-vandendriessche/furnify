import React from 'react';
import * as THREE from 'three';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';

export class DrawablePoint extends Vector3 {}

export const Point: React.FC<{ point: Vector3 }> = ({ point }) => (
    <mesh position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );