import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { InstancedRigidBodies } from "@react-three/rapier";

function ObjectsSphere({
  count = 18,
  vec = new THREE.Vector3(),
  rfs = THREE.MathUtils.randFloatSpread,
}) {
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new THREE.Color(0x000000), 0);
    mainState.camera.position.z = 40;
  }, []);

  const api = useRef();

  useFrame((state, delta) => {
    api.current.forEach((body) => {
      body.applyImpulse(
        vec
          .copy(body.translation())
          .normalize()
          .multiplyScalar(-900 * delta)
      );
    });
  });

  const finalObjects = useMemo(() => {
    const cubes = [];
    // totl will be 5 times
    let numPerObj = count / 5;
    let tempKey = 0;

    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh args={[undefined, undefined, 1]} key={tempKey}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh args={[undefined, undefined, 1]} key={tempKey}>
          <coneBufferGeometry args={[0.8, 1.3, 20, 2]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh args={[undefined, undefined, 1]} key={tempKey}>
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh args={[undefined, undefined, 1]} key={tempKey}>
          <octahedronBufferGeometry args={[1, 0]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }
    for (let i = 0; i < numPerObj + 2; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh args={[undefined, undefined, 1]} key={tempKey}>
          <torusBufferGeometry args={[0.8, 0.3, 12, 24]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }

    return cubes;
  }, []);

  return (
    <InstancedRigidBodies
      ref={api}
      colliders="ball"
      linearDamping={1}
      angularDamping={0.85}
      positions={Array.from({ length: count }, () => [
        rfs(10),
        rfs(10),
        rfs(10),
      ])}
    >
      {finalObjects}
    </InstancedRigidBodies>
  );
}

export default ObjectsSphere;
