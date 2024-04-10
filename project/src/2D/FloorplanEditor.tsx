import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useThree, useFrame } from "@react-three/fiber";
import {
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  Vector3,
  Vector2,
  Plane,
  Raycaster,
  BufferGeometry,
  LineBasicMaterial,
  Line,
} from "three";
import * as THREE from "three";
import { DrawableLine, LinePrimitive, TextSprite } from "./components/Line";
import { DrawablePoint, Point } from "./components/Point";
import { use } from "i18next";

const useMousePosition = (camera) => {
  const [currentMousePosition, setCurrentMousePosition] =
    useState<Vector3 | null>(null);

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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  return currentMousePosition;
};

export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point
  const currentMousePosition = useMousePosition(camera);

  const [isDrawing, setIsDrawing] = useState(true);

  // when d is pressed, toggle drawing
  // possibly replace this with pressing a button onscreen
  useEffect(() => {
    const toggleDrawing = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        setIsDrawing((prev) => {
          console.log("Drawing is now ", !prev);
          return !prev;
        });
      }
    };

    window.addEventListener("keydown", toggleDrawing);
    return () => window.removeEventListener("keydown", toggleDrawing);
  }, []);

  const addPoint = useCallback(
    (point: DrawablePoint) => {
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
    },
    [scene]
  );

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      setIsDrawing((prev) => {
        console.log("Drawing is now ", !prev);
        return !prev;
      });
    };

    const handleClick = (event: MouseEvent) => {
      if (!isDrawing) return;
      event.preventDefault();
      if (currentMousePosition) {
        addPoint(
          new DrawablePoint(
            currentMousePosition.x,
            currentMousePosition.y,
            currentMousePosition.z
          )
        );
        if (tempLineRef.current) {
          tempLineRef.current.removeFromScene(scene);
          tempLineRef.current = null;
        }
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleRightClick);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleRightClick);
    };
  }, [addPoint, currentMousePosition, scene, isDrawing]);

  useFrame(() => {
    if (isDrawing && currentMousePosition && latestPointRef.current) {
      if (!tempLineRef.current) {
        const tempLine = new DrawableLine(
          latestPointRef.current,
          currentMousePosition
        );
        tempLine.addToScene(scene);
        tempLineRef.current = tempLine;
      } else {
        tempLineRef.current.update(currentMousePosition);
      }
    } else if (tempLineRef.current) {
      tempLineRef.current.removeFromScene(scene);
      tempLineRef.current = null;
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
      {points.map((point, index) => (
        <Point key={index} point={point} />
      ))}
      {lines.map((line, index) => (
        <LinePrimitive key={index} line={line.line} />
      ))}
      {lineLengthSprites}
    </>
  );
};
