import React from 'react';
import { Vector3 } from 'three';
import * as THREE from 'three';

const SphereMesh: React.FC<Props> = ({
    castShadow = true,
    visible = true,
    position = new Vector3(0, 0, 0),
    ...props
}) => {
    const { color, children } = props;

    const material = new THREE.MeshLambertMaterial({ color });

    return (
        <mesh
            {...props}
            castShadow={castShadow}
            visible={visible}
            position={position as Vector3}
            material={material}
        >
            <sphereBufferGeometry attach="geometry" />
            {children}
        </mesh>
    );
};

interface Props {
    castShadow?: boolean;
    color: string;
    scale?: Vector3;
    visible?: boolean;
    position?: Vector3;
    ref?: React.Ref<THREE.Mesh>;
}

export default SphereMesh;
