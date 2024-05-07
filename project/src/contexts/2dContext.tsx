import React, { createContext, useState, useRef, useContext } from "react";
import { DrawablePoint } from "../2D/components/Point";
import { DrawableLine } from "../2D/components/Line";
import * as THREE from "three";
import {
  BoxGeometry,
  ExtrudeGeometry,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Shape,
  ShapeGeometry,
  Vector2,
  Vector3,
} from "three";
import { useThree } from "@react-three/fiber";
import { off } from "process";

const DrawingContext = createContext<any>(null);

export const use2d = () => useContext(DrawingContext);

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(true);
  const drawingCanvasRef = useRef(null);

  const [orthogonalMode, setOrthogonalMode] = useState(false);

  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const [gridSize, setGridSize] = useState(0.1);

  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point

  const [snappingMode, setSnappingMode] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const [isClosed, setIsClosed] = useState<boolean>(false);

  const [show3D, setShow3D] = useState<boolean>(false);

  const [wallProperties, setWallProperties] = useState<{
    height: number;
    thickness: number;
  }>({ height: 2, thickness: 0.3 });

  type SceneObject = Mesh<any, any>;
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);

  // convert to 3D
  const handleConvertTo3D = () => {
    const { mesh: floor, offset } = createFloor(points);
    const walls: Mesh[] = createWalls(points, offset);
    setSceneObjects([...walls, floor]);
    // console.log(walls, floor);
  };

  function determineOrientation(points) {
    let sum = 0;
    for (let i = 0; i < points.length; i++) {
        const current = points[i];
        const next = points[(i + 1) % points.length]; // Wrap around
        sum += (next.x - current.x) * (next.y + current.y);
    }
    return sum > 0 ? 'counterclockwise' : 'clockwise';
}

  function createWalls(points: Vector3[], offset): Mesh[] {
    const walls: Mesh[] = [];
    const wallHeight = wallProperties.height;
    const wallThickness = wallProperties.thickness;

    let orientation = determineOrientation(points);

    for (let i = 0; i < points.length; i++) {
      const startPoint = points[i];
      const endPoint = points[(i + 1) % points.length]; // Wrap around to connect the last point to the first

      const direction = new Vector3().subVectors(endPoint, startPoint);
      const length = startPoint.distanceTo(endPoint);
      const geometry = new BoxGeometry(length, wallThickness, wallHeight);
      const material = new MeshStandardMaterial({ color: "gray" });
      const wall = new Mesh(geometry, material);

      // Calculate the midpoint for wall positioning
      const midpoint = new Vector3()
        .addVectors(startPoint, endPoint)
        .multiplyScalar(0.5);

      // Calculate the rotation angle to align the wall with the line between startPoint and endPoint
      const angle = Math.atan2(
        endPoint.y - startPoint.y,
        endPoint.x - startPoint.x
      );

      const normal = new Vector3(-direction.y, direction.x, 0)
        .normalize()
        .multiplyScalar((orientation === 'counterclockwise' ? 1 : -1) * wallThickness / 2);
      midpoint.add(offset);
      midpoint.add(normal);

      // Set the wall's position and rotation
      wall.position.set(midpoint.x, midpoint.y, wallHeight / 2);
      wall.rotation.z = angle;
      wall.rotation.x = 0;

      walls.push(wall);
    }

    // walls.forEach((wall, index) => {
    //   console.log(`Wall ${index}:`, wall);
    // });

    return walls;
  }

  function createFloor(points) {
    // Create a Shape from the points, assuming they are ordered and form a closed loop
    const shape = new Shape(points.map((p) => new Vector2(p.x, p.y)));

    // Define extrusion settings
    const extrudeSettings = {
      steps: 1,
      depth: 0.3, // Thickness of the floor
      bevelEnabled: false, // No bevel   for simplicity
    };

    // Create geometry by extruding the shape
    const geometry = new ExtrudeGeometry(shape, extrudeSettings);

    // Material for the extruded shape
    const material = new MeshStandardMaterial({
      color: "lightblue",
      side: THREE.DoubleSide,
    });

    // Create the mesh
    const mesh = new Mesh(geometry, material);

    // Calculate bounding box to find center
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    const offset = bbox
      ? new Vector3()
          .addVectors(bbox.min, bbox.max)
          .multiplyScalar(0.5)
          .negate()
      : new Vector3();

    mesh.geometry.translate(offset.x, offset.y, 0);

    return { mesh, offset };
  }

  // Toggle drawing state
  const toggleDrawing = () =>
    setIsDrawing((prev) => {
      // console.log("Drawing is now: " + !prev);
      return !prev;
    });

  // Toggle orthogonal mode
  const toggleOrthogonalMode = () =>
    setOrthogonalMode((prev) => {
      // console.log("Orthogonal mode is now: " + !prev);
      return !prev;
    });

  // Remove all elements from the canvas
  const removeAll = () => {
    let confirmation = window.confirm(
      "Are you sure you want to remove everything?"
    );
    if (confirmation) {
      setPoints([]);
      setLines([]);
      setSceneObjects([]);
      setIsClosed(false);
    }
  };

  const value = {
    isDrawing,
    toggleDrawing,
    drawingCanvasRef,
    points,
    setPoints,
    lines,
    setLines,
    tempLineRef,
    latestPointRef,
    removeAll,
    orthogonalMode,
    toggleOrthogonalMode,
    isHoveringCanvas,
    setIsHoveringCanvas,
    gridSize,
    setGridSize,
    snappingMode,
    setSnappingMode,
    showGrid,
    setShowGrid,
    isClosed,
    setIsClosed,
    handleConvertTo3D,
    sceneObjects,
    show3D,
    setShow3D,
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
