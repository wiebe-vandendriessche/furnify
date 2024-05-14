import { createContext, useContext, useState } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorContext } from './ConfiguratorContext';

const IntersectionContext = createContext();

export const IntersectionProvider = ({ children }) => {

    const dObstructions = useRef({});
    const [errorBoxes, setErrorBoxes] = useState([]);

    const { getOtherObstacles } = useConfiguratorContext();
    const obstacles = getOtherObstacles();

    useEffect(() => {
        removeDObstruction();
    });


    // Add a component to the list of dObstructions when it mounts
    const addDObstruction = (mesh, obstructionKey) => {
        if (mesh && !dObstructions.current[obstructionKey]) {
            dObstructions.current[obstructionKey] = mesh; // Storing mesh with its ID as the key
        }
    };

    // Remove a component from the list of dObstructions when it unmounts/removed from contextprovider list
    const removeDObstruction = () => {
        const keys = obstacles.map(obstacle => obstacle.id);
        for (let key in dObstructions.current) {
            //check if key is in keys and if not remove it
            if (!keys.includes(key)) {
                delete dObstructions.current[key];
            }
        }
    };

    // Cleanup: remove all dObstructions when the component unmounts
    useEffect(() => {
        return () => {
            dObstructions.current = {};
        };
    }, []);

    const checkIntersections = () => {
        console.log('Checking intersections...');

        // Convert dictionary of meshes to an array of meshes
        const meshes = Object.values(dObstructions.current);

        // Create bounding boxes for the meshes
        const boundingBoxes = meshes.map(mesh => {
            mesh.geometry.computeBoundingBox();
            return mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
        });

        // Check for intersections between each pair of bounding boxes
        let intersectionsDetected = false;
        const tempErrorBoxes = [];

        for (let i = 0; i < boundingBoxes.length; i++) {
            for (let j = i + 1; j < boundingBoxes.length; j++) {
                if (boundingBoxes[i].intersectsBox(boundingBoxes[j])) {
                    intersectionsDetected = true;
                    // Handle intersection
                    if (!(tempErrorBoxes.includes(boundingBoxes[i]) || tempErrorBoxes.includes(boundingBoxes[j]))) {
                        tempErrorBoxes.push(boundingBoxes[i]);
                        tempErrorBoxes.push(boundingBoxes[j]);
                    }
                }
            }
        }

        if (intersectionsDetected) {
            console.log('Intersections detected');
            window.alert('Intersections detected!\nPlease adjust the configuration to avoid intersections.\nError at boxes:');
        }

        if (!intersectionsDetected) {
            console.log('No intersections detected');
            window.alert('No intersections detected!\nYou can proceed with the configuration.\nDon\'t forget to check again when you made changes to the previous configuration.');
        }

        //update errorBoxes
        setErrorBoxes(tempErrorBoxes);
    };

    const getErrorBoxes = () => {
        return errorBoxes;
    }

    useEffect(() => {
        console.log('Error boxes updated:');
        console.log(errorBoxes);
    }, [errorBoxes]);


    const value = {
        addDObstruction,
        removeDObstruction,
        checkIntersections,
        getErrorBoxes,
    };

    return (
        <IntersectionContext.Provider value={value}>
            {children}
        </IntersectionContext.Provider>
    );
};

export const useIntersectionContext = () => {
    return useContext(IntersectionContext);
};