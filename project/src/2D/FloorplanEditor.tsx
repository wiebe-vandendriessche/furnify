import React, { useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';
import * as THREE from 'three';

class DrawablePoint extends Vector3 { }

class DrawableLine {
  private geometry: BufferGeometry;
  private material: LineBasicMaterial;
  public line: Line | null = null;

  constructor(start: DrawablePoint, end: DrawablePoint) {
    this.geometry = new BufferGeometry().setFromPoints([start, end]);
    this.material = new LineBasicMaterial({ color: 0x0000ff });
    this.line = new Line(this.geometry, this.material);
  }

  update(end: DrawablePoint) {
    if (this.line) {
      const start = this.geometry.attributes.position.array.slice(0, 3) as unknown as [number, number, number];
      const startPoint = new Vector3(...start);
      this.geometry.setFromPoints([startPoint, end]);
      this.geometry.attributes.position.needsUpdate = true;
    }
  }

  addToScene(scene: THREE.Scene) {
    if (this.line) {
      scene.add(this.line);
    }
  }

  removeFromScene(scene: THREE.Scene) {
    if (this.line) {
      scene.remove(this.line);
      if (this.geometry) this.geometry.dispose();
      if (this.material) this.material.dispose();
      this.line = null;
    }
  }
}

class TextSprite {
  sprite: Sprite;

  constructor(text: string, position: Vector3) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error("Failed to get canvas context");
    context.font = '64px serif';
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(text, 0, 50);

    const texture = new CanvasTexture(canvas);
    const material = new SpriteMaterial({ map: texture });
    this.sprite = new Sprite(material);
    this.sprite.position.copy(position);
    this.sprite.scale.set(0.5, 0.25, 1);

    canvas.width = context.measureText(text).width;
    canvas.height = 64; // Adjust based on font size
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(text, 0, 50);
    texture.needsUpdate = true;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.sprite);
  }

  removeFromScene(scene: THREE.Scene) {
    scene.remove(this.sprite);
    if (this.sprite.material) {
      const spriteMaterial = this.sprite.material as SpriteMaterial;
      if (spriteMaterial.map) {
        spriteMaterial.map.dispose();
      }
      spriteMaterial.dispose();
    }
  }
}

export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const [currentMousePosition, setCurrentMousePosition] = useState<Vector3 | null>(null);
  let [tempLine, setTempLine] = useState<DrawableLine | null>(null);

  const addPoint = useCallback((point: DrawablePoint) => {
    setPoints(prevPoints => [...prevPoints, point]);
    // Voeg direct een lijn toe als er al minstens één punt bestaat
    if (points.length > 0) {
      const newLine = new DrawableLine(points[points.length - 1], point);
      newLine.addToScene(scene);
      setLines(prevLines => [...prevLines, newLine]);
    }
  }, [points, scene]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const mousePosition = new Vector2(x, y);
      const raycaster = new Raycaster();
      raycaster.setFromCamera(mousePosition, camera);

      const planeZ = new Plane(new Vector3(0, 0, 1), 0);
      const intersection = new Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);

      if (intersection) {
        setCurrentMousePosition(intersection);
        // Update de tijdelijke lijn
        if (points.length > 0 && !tempLine) {
          let temp = new DrawableLine(points[points.length - 1], intersection);
          temp.addToScene(scene);
          setTempLine(temp);
        } else if (tempLine) {
          tempLine.update(intersection);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    // return () => {
    //   window.removeEventListener('mousemove', handleMouseMove);
    //   if (tempLine) {
    //     tempLine.removeFromScene(scene);
    //   }
    // };
  }, [camera, points, tempLine, scene]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();

      if (currentMousePosition) {
        addPoint(new DrawablePoint(currentMousePosition.x, currentMousePosition.y, currentMousePosition.z));
        if (tempLine) {
          tempLine.removeFromScene(scene);
          setTempLine(null);
        }
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [addPoint, currentMousePosition, tempLine, scene]);

  useFrame(() => {
    if (points.length > 0 && currentMousePosition) {
      // Verwijder eerst de vorige tijdelijke lijn uit de scene voor het geval dat
      if (tempLine) {
        tempLine.removeFromScene(scene);
      }
  
      // Creëer een nieuwe tijdelijke lijn met het laatste punt en de huidige muispositie
      const lastPoint = points[points.length - 1];
      tempLine = new DrawableLine(lastPoint, currentMousePosition);
      tempLine.addToScene(scene);
      setTempLine(tempLine);
    }
  });


  return (
    <>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
      {/* Render logica voor lijnen en tekst sprites kan hier toegevoegd worden als dat nodig is */}
    </>
  );
};

export default FloorplanEditor;
