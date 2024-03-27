import React, { useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { CanvasTexture, SpriteMaterial, Sprite, Vector3, Vector2, Plane, Raycaster, BufferGeometry, LineBasicMaterial, Line } from 'three';

// Helper function to create a text sprite
const createTextSprite = (text: string): Sprite => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to get canvas context');
  }
  context.font = '64px serif';
  context.fillStyle = 'rgba(0, 0, 0, 1.0)';
  context.fillText(text, 0, 50);

  const texture = new CanvasTexture(canvas);
  const material = new SpriteMaterial({ map: texture });
  const sprite = new Sprite(material);
  sprite.scale.set(0.5, 0.25, 1);

  return sprite;
};

interface Point extends Vector3 { }

export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<Point[]>([]);
  const [line, setLine] = useState<Line | null>(null);
  const [textSprites, setTextSprites] = useState<Sprite[]>([]);
  const [currentMousePosition, setCurrentMousePosition] = useState<Vector3 | null>(null);
  const [tempLine, setTempLine] = useState<Line | null>(null);



  const addPoint = useCallback((point: Point) => {
    setPoints((prevPoints) => [...prevPoints, point]);
  }, []);

  useFrame(() => {
    if (points.length > 1) {
      const geometry = new BufferGeometry().setFromPoints(points);
      if (!line) {
        const material = new LineBasicMaterial({ color: 0x0000ff });
        const newLine = new Line(geometry, material);
        setLine(newLine);
        scene.add(newLine);
      } else {
        line.geometry.dispose();
        line.geometry = geometry;
      }

      textSprites.forEach((sprite) => scene.remove(sprite));
      const newTextSprites: Sprite[] = [];

      for (let i = 1; i < points.length; i++) {
        const distance = points[i].distanceTo(points[i - 1]).toFixed(2);
        const midpoint = new Vector3().addVectors(points[i], points[i - 1]).multiplyScalar(0.5);
        const sprite = createTextSprite(`${distance}m`);
        sprite.position.copy(midpoint as Vector3);
        scene.add(sprite);
        newTextSprites.push(sprite);
      }

      setTextSprites(newTextSprites);

      // Update or create the temporary line
      if (points.length > 0 && currentMousePosition) {
        const lastPoint = points[points.length - 1];
        const geometry = new BufferGeometry().setFromPoints([lastPoint, currentMousePosition]);

        if (!tempLine) {
          const material = new LineBasicMaterial({ color: 0xff0000 }); // Different color for the temp line
          const line = new Line(geometry, material);
          setTempLine(line);
          scene.add(line);
        } else {
          tempLine.geometry.dispose(); // Dispose of the old geometry
          tempLine.geometry = geometry;
        }
      }
    }
  });

  useEffect(() => {
    return () => {
        if (tempLine) scene.remove(tempLine);
    };
}, [tempLine, scene]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new Raycaster();
      raycaster.setFromCamera(new Vector2(x, y), camera);

      const planeZ = new Plane(new Vector3(0, 0, 1), 0);
      const intersection = new Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);

      if (intersection) {
        addPoint(intersection.clone() as Point);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [addPoint, camera]);


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

  const spheres = points.map((point, index) => (
    <mesh key={index} position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  ));

  return <>{spheres}</>;
};

export default FloorplanEditor;
