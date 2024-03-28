import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';
import * as THREE from 'three';

class DrawablePoint extends Vector3 { }

class DrawableLine {
  private geometry: BufferGeometry;
  private material: LineBasicMaterial;
  public line: Line;
  private start: DrawablePoint;
  private end: DrawablePoint;

  constructor(start: DrawablePoint, end: DrawablePoint) {
    this.start = start;
    this.end = end;
    this.geometry = new BufferGeometry().setFromPoints([start, end]);
    this.material = new LineBasicMaterial({ color: 0x0000ff });
    this.line = new Line(this.geometry, this.material);
  }

  update(end: DrawablePoint) {
    this.end = end; // Update de eindpositie
    if (this.line) {
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

const TextSprite: React.FC<{ text: string; position: Vector3 }> = ({ text, position }) => {
  const { scene } = useThree();

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error("Unable to get canvas context");

    context.font = '64px serif';
    context.fillStyle = 'rgba(0, 0, 0, 1.0)';
    context.fillText(text, 0, 64);

    const texture = new CanvasTexture(canvas);
    const material = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(material);

    sprite.position.copy(position);
    sprite.scale.set(0.5, 0.5, 0.5);
    scene.add(sprite);

    return () => {
      scene.remove(sprite);
      if (sprite.material) {
        const spriteMaterial = sprite.material as SpriteMaterial;
        if (spriteMaterial.map) {
          spriteMaterial.map.dispose();
        }
        spriteMaterial.dispose();
      }
      material.dispose();
    };
  }, [text, position, scene]);

  return null;
};

export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [currentMousePosition, setCurrentMousePosition] = useState<Vector3 | null>(null);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);

  const addPoint = useCallback((point: DrawablePoint) => {
    setPoints(prevPoints => {
      // Voeg het nieuwe punt toe aan de bestaande punten
      const updatedPoints = [...prevPoints, point];

      // Controleer of we nu genoeg punten hebben om een lijn te tekenen
      if (updatedPoints.length > 1) {
        // Pak het voorlaatste punt als startpunt
        const start = updatedPoints[updatedPoints.length - 2];
        const newLine = new DrawableLine(start, point);
        newLine.addToScene(scene);
        setLines(prevLines => [...prevLines, newLine]);
      }

      return updatedPoints;
    });
  }, [scene]);

  const handleClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    if (currentMousePosition) {
      addPoint(new DrawablePoint(currentMousePosition.x, currentMousePosition.y, currentMousePosition.z));
      // Verwijder de tijdelijke lijn na het toevoegen van een nieuw punt
      if (tempLineRef.current) {
        tempLineRef.current.removeFromScene(scene);
        tempLineRef.current = null; // Reset de ref na verwijdering
      }
    }
  }, [addPoint, currentMousePosition, scene]);



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
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);


  useEffect(() => {
    // Voeg de handleClick als event listener toe aan het window object
    window.addEventListener('click', handleClick);
    return () => {
      // Verwijder de event listener wanneer de component wordt ontmanteld
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  useFrame(() => {
    if (currentMousePosition) {
      if (!tempLineRef.current && points.length > 0) {
        // Creëer de tijdelijke lijn als deze nog niet bestaat
        const tempLine = new DrawableLine(points[points.length - 1], currentMousePosition);
        tempLine.addToScene(scene);
        tempLineRef.current = tempLine;
      } else if (tempLineRef.current) {
        // Update de bestaande tijdelijke lijn
        tempLineRef.current.update(currentMousePosition);
      }
    }
  });



  const lineLengthSprites = useMemo(() => points.slice(1).map((point, index) => {
    const start = points[index];
    const end = point;
    const length = start.distanceTo(end).toFixed(2);
    const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
    return <TextSprite key={index} text={`${length}m`} position={midpoint} />;
  }), [points]);

  return (
    <>
      {points.map((point, index) => (
        <mesh key={index} position={[point.x, point.y, point.z]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color={'red'} />
        </mesh>
      ))}
      {lines.map((line, index) => (
        <primitive key={index} object={line.line} />
      ))}
      {lineLengthSprites}
    </>
  );

};