import React, { createContext, useState, useRef, useContext } from "react";
import { DrawablePoint } from "../2D/components/Point";
import { DrawableLine } from "../2D/components/Line";
import * as THREE from "three";
import { BoxGeometry, ExtrudeGeometry, Mesh, MeshStandardMaterial, Object3D, Shape, ShapeGeometry, Vector2, Vector3 } from 'three';
import { useThree } from "@react-three/fiber";

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

  const [walls, setWalls] = useState();
  const [floor, setFloor] = useState();


  // Define the state type as an array of Meshes
  type SceneObject = Mesh<any, any>;  // Use more specific types instead of 'any' if known
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([]);


  // convert to 3D
  const handleConvertTo3D = () => {
    const walls: THREE.InstancedMesh = createWalls(points);
    const floor: Mesh<any, any> = createFloor(points); // Assumes points are in order and form a closed loop
    setSceneObjects([walls, floor]);
    // console.log(walls, floor);
  };

  function createWall(line: DrawableLine) {
    const length = line.start.distanceTo(line.end);
    const geometry = new BoxGeometry(length, 2, 0.3);  // Length, height, and thickness
    const material = new MeshStandardMaterial({ color: 'gray' });
    const mesh = new Mesh(geometry, material);

    // Calculate the midpoint for positioning
    const midpoint = new Vector3().addVectors(line.start, line.end).multiplyScalar(0.5);

    // Calculate the rotation angle
    const angle = Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x);

    // Position the mesh at the midpoint
    mesh.position.set(midpoint.x, 0, midpoint.y);  // Adjusted for Y up in Three.js (if necessary)

    // Set rotation about the vertical axis (Y in Three.js is up)
    mesh.rotation.y = angle;

    // The wall's vertical orientation is by default correct if Y is up in your scene
    return mesh;
  }

  function createWalls(points: Vector3[]): THREE.InstancedMesh {
    const wallHeight = 2;
    const wallThickness = 0.3;
    const wallLength = points[0].distanceTo(points[1]); // Assuming uniform wall length for simplicity

    const geometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
    const material = new THREE.MeshStandardMaterial({ color: 'gray' });
    const walls = new THREE.InstancedMesh(geometry, material, points.length);

    points.forEach((point, i) => {
      const nextPoint = points[(i + 1) % points.length];
      const length = point.distanceTo(nextPoint);
      const midpoint = new Vector3().addVectors(point, nextPoint).multiplyScalar(0.5);
      const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x);

      const matrix = new THREE.Matrix4();
      matrix.makeTranslation(midpoint.x, midpoint.y, wallHeight);
      matrix.makeRotationY(angle);

      walls.setMatrixAt(i, matrix);
    });

    return walls;
  }


  function createFloor(points) {
    // Create a Shape from the points, assuming they are ordered and form a closed loop
    const shape = new Shape(points.map(p => new Vector2(p.x, p.y)));

    // Define extrusion settings
    const extrudeSettings = {
      steps: 1,
      depth: 0.3, // Thickness of the floor
      bevelEnabled: false, // No bevel   for simplicity
    };

    // Create geometry by extruding the shape
    const geometry = new ExtrudeGeometry(shape, extrudeSettings);

    // Material for the extruded shape
    const material = new MeshStandardMaterial({ color: 'lightblue', side: THREE.DoubleSide });

    // Create the mesh
    const mesh = new Mesh(geometry, material);

    // Adjust the mesh position to center the extrusion
    mesh.position.z = -extrudeSettings.depth / 2; // Adjust position to align with the ground level if necessary

    return mesh;
  }




  // Toggle drawing state
  const toggleDrawing = () =>
    setIsDrawing((prev) => {
      console.log("Drawing is now: " + !prev);
      return !prev;
    });

  // Toggle orthogonal mode
  const toggleOrthogonalMode = () => setOrthogonalMode((prev) => {
    console.log("Orthogonal mode is now: " + !prev);
    return !prev;
  })

  // Remove all elements from the canvas
  const removeAll = () => {
    let confirmation = window.confirm(
      "Are you sure you want to remove everything?"
    );
    if (confirmation) {
      setPoints([]);
      setLines([]);
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
    sceneObjects
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
