import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';
import * as THREE from 'three';


class DrawablePoint extends Vector3 {}

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

const useMousePosition = (camera) => {
  const [currentMousePosition, setCurrentMousePosition] = useState<Vector3 | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const mousePosition = new Vector2(x, y);
      const raycaster = new Raycaster();
      raycaster.setFromCamera(mousePosition, camera);

      const planeZ = new Plane(new Vector3(0, 0, 1), 0);
      const intersection = new Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);

      if (intersection) setCurrentMousePosition(intersection);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [camera]);

  return currentMousePosition;
};

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
      texture.dispose();
      material.dispose();
    };
  }, [text, position, scene]);

  return null;
};

const Point: React.FC<{ point: Vector3 }> = ({ point }) => (
  <mesh position={[point.x, point.y, point.z]}>
    <sphereGeometry args={[0.1, 32, 32]} />
    <meshStandardMaterial color={'red'} />
  </mesh>
);

const LinePrimitive: React.FC<{ line: Line }> = ({ line }) => <primitive object={line} />;

export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point
  const currentMousePosition = useMousePosition(camera);

  const addPoint = useCallback((point: DrawablePoint) => {
    latestPointRef.current = point;
    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, point];
      if (updatedPoints.length > 1) {
        const start = updatedPoints[updatedPoints.length - 2];
        const newLine = new DrawableLine(start, point);
        newLine.addToScene(scene);
        setLines((prevLines) => [...prevLines, newLine]);
      }
      return updatedPoints;
    });
  }, [scene]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      if (currentMousePosition) {
        addPoint(new DrawablePoint(currentMousePosition.x, currentMousePosition.y, currentMousePosition.z));
        if (tempLineRef.current) {
          tempLineRef.current.removeFromScene(scene);
          tempLineRef.current = null;
        }
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [addPoint, currentMousePosition, scene]);

  useFrame(() => {
    if (currentMousePosition && latestPointRef.current) {
      if (!tempLineRef.current) {
        const tempLine = new DrawableLine(latestPointRef.current, currentMousePosition);
        tempLine.addToScene(scene);
        tempLineRef.current = tempLine;
      } else {
        tempLineRef.current.update(currentMousePosition);
      }
    }
  });

  const lineLengthSprites = points.slice(1).map((point, index) => {
    const start = points[index];
    const end = point;
    const length = start.distanceTo(end).toFixed(2);
    const midpoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
    return <TextSprite key={index} text={`${length}m`} position={midpoint} />;
  });

  return (
    <>
      {points.map((point, index) => <Point key={index} point={point} />)}
      {lines.map((line, index) => <LinePrimitive key={index} line={line.line} />)}
      {lineLengthSprites}
    </>
  );
};