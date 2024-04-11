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
import { use2d } from "../contexts/2dContext";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

/**
 * Keeps track of the current mouse position in 3D space
 * @param camera 
 * @returns current mouse position in 3D space: Vector3 | null
 */
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

/**
 * FloorplanEditor component logic and rendering
 * @returns FloorplanEditor component
 */
export const FloorplanEditor: React.FC = () => {
  const { scene, camera } = useThree();
  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point
  const currentMousePosition = useMousePosition(camera);
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const [isNearStart, setIsNearStart] = useState<boolean>(false);
  const snapThreshold: number = 0.5;

  /**
   * Visual feedback for when the cursor is near the start point
   */
  useEffect(() => {
    if (!isDrawing || points.length < 1) {
      setIsNearStart(false);
      return;
    }

    const checkProximity = (event: MouseEvent) => {
      if (!currentMousePosition || points.length < 1) return;

      const start = points[0];
      const distance = currentMousePosition.distanceTo(start);

      if (distance < snapThreshold) {
        console.log("near start");
        setIsNearStart(true);
      } else {
        setIsNearStart(false);
      }
    };

    window.addEventListener("mousemove", checkProximity);
    return () => window.removeEventListener("mousemove", checkProximity);
  }, [currentMousePosition, isDrawing, points]);

  /**
   * Toggle drawing with the "d" key
   * possibly replace this with pressing a button onscreen
   */
  useEffect(() => {
    const toggleDrawingKey = (event: KeyboardEvent) => {
      if (event.key === "d" || event.key === "D") {
        toggleDrawing();
      }
    };

    window.addEventListener("keydown", toggleDrawingKey);
    return () => window.removeEventListener("keydown", toggleDrawingKey);
  }, []);

  /**
   * Logic for adding points to the scene
   */
  const addPoint = useCallback(
    (newPoint: DrawablePoint) => {
      // function to check if cursor is close to start, so close the shape
      const isCloseToStart = (point: DrawablePoint) => {
        if (points.length < 2) return false;
        const start = points[0];
        return (
          Math.sqrt(
            Math.pow(point.x - start.x, 2) + Math.pow(point.y - start.y, 2)
          ) < snapThreshold
        );
      };

      // closing the shape
      if (isDrawing && points.length > 1 && isCloseToStart(newPoint)) {
        newPoint = points[0];
        toggleDrawing();
        if (tempLineRef.current) {
          tempLineRef.current.removeFromScene(scene);
          tempLineRef.current = null;
        }
      }
      // add the point normally
      latestPointRef.current = newPoint;
      setPoints((prevPoints) => {
        const updatedPoints = [...prevPoints, newPoint];
        if (updatedPoints.length > 1) {
          const start = updatedPoints[updatedPoints.length - 2];
          const newLine = new DrawableLine(start, newPoint);
          newLine.addToScene(scene);
          setLines((prevLines) => [...prevLines, newLine]);
        }
        return updatedPoints;
      });
    },
    [scene, isDrawing, points]
  );

  /**
   * Handle left and right clicks
   */
  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault();
      toggleDrawing();
    };

    const handleClick = (event: MouseEvent) => {
      if (!isDrawing) return;
      if (
        drawingCanvasRef.current &&
        !drawingCanvasRef.current.contains(event.target)
      ) {
        console.log("clicked outside drawing canvas");
        toggleDrawing();
        return;
      }
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

  /**
   * Update the temp line when drawing
   */
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

  /**
   * Display the length of each line
   */
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
        <Point
          key={index}
          point={point}
          color={isNearStart && index === 0 ? "yellow" : "red"}
          scale={isNearStart && index === 0 ? 1.5 : 1}
        />
      ))}
      {lines.map((line, index) => (
        <LinePrimitive key={index} line={line.line} />
      ))}
      {lineLengthSprites}
      {isDrawing && tempLineRef.current && (
        <TextSprite
          key={points.length}
          text={`${tempLineRef.current.getLength().toFixed(2)}m`}
          position={tempLineRef.current.getMidPoint()}
        />
      )}
    </>
  );
};
