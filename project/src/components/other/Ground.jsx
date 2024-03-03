import { MeshLambertMaterial, PlaneGeometry } from 'three';


export const Ground = () => {
    const groundGeo = new PlaneGeometry(10000, 10000);
    const groundMat = new MeshLambertMaterial({ color: 0xf7e497 });

    return (
        <mesh
            geometry={groundGeo}
            material={groundMat}
            position={[0, -33, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
        />
    );
};