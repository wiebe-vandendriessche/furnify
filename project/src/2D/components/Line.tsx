import * as THREE from 'three';
import { DrawablePoint } from './Point';
import React from 'react';
import { Line } from 'three';

export class DrawableLine {
  private geometry: THREE.BufferGeometry;
  private material: THREE.LineBasicMaterial;
  public line: THREE.Line;
  private start: DrawablePoint;
  private end: DrawablePoint;
  
  constructor(start: DrawablePoint, end: DrawablePoint) {
    this.start = start;
    this.end = end;
    this.geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
    this.material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    this.line = new THREE.Line(this.geometry, this.material);
  }
  
  update(end: DrawablePoint) {
    if (!this.end.equals(end)) {
    this.end.copy(end);
    this.geometry.setFromPoints([this.start, this.end]);
    this.geometry.attributes.position.needsUpdate = true;
    }
  }
  
  addToScene(scene: THREE.Scene) {
    scene.add(this.line);
  }
  
  removeFromScene(scene: THREE.Scene) {
    scene.remove(this.line);
    this.geometry.dispose();
    this.material.dispose();
  }
}

export const LinePrimitive: React.FC<{ line: Line }> = ({ line }) => <primitive object={line} />;
