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
    const walls: Mesh[] = createWalls(points);
    const floor: Mesh<any, any> = createFloor(points); // Assumes points are in order and form a closed loop
    setSceneObjects([...walls, floor]);
    // console.log(walls, floor);
  };

  function createWalls(points: Vector3[]): Mesh[] {
    const walls: Mesh[] = [];
    const wallHeight = 2; // Set the height of the walls
    const wallThickness = 0.3; // Set the thickness of the walls

    for (let i = 0; i < points.length; i++) {
      const startPoint = points[i];
      const endPoint = points[(i + 1) % points.length]; // Wrap around to connect the last point to the first

      const length = startPoint.distanceTo(endPoint);
      const geometry = new BoxGeometry(length, wallThickness, wallHeight);
      const material = new MeshStandardMaterial({ color: 'gray' });
      const wall = new Mesh(geometry, material);

      // Calculate the midpoint for wall positioning
      const midpoint = new Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);

      // Calculate the rotation angle to align the wall with the line between startPoint and endPoint
      const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

      // Set the wall's position and rotation
      wall.position.set(midpoint.x, midpoint.y, wallHeight / 2);
      wall.rotation.z = angle; 
      wall.rotation.x = 0;

      walls.push(wall);
    }

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
    // mesh.position.z = -extrudeSettings.depth / 2; // Adjust position to align with the ground level if necessary

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
