import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { InstancedRigidBodies } from "@react-three/rapier";
import { useState } from "react";

function CenterObjects({ count = 6, vec = new THREE.Vector3() }) {
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new THREE.Color(0x000000), 0);
  }, []);

  const api = useRef();

  // useFrame((state, delta) => {
  //   api.current.forEach((body) => {
  //     body.applyImpulse(
  //       vec
  //         .copy(body.translation())
  //         .normalize()
  //         .multiplyScalar(-900 * delta)
  //     );
  //   });
  // });

  const forceConstant = 2000;

  function clickHandler() {
    api.current.forEach((body) => {
      const x = (Math.random() - 0.5) * forceConstant;
      const y = (Math.random() - 0.5) * forceConstant;
      const z = (Math.random() - 0.5) * forceConstant;

      body.applyImpulse({ x: x, y: y, z: z });
    });
  }

  const finalObjects = useMemo(() => {
    const cubes = [];
    let tempKey = 0;

    for (let i = 0; i < count; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <instancedMesh
          args={[undefined, undefined, 1]}
          key={tempKey}
          onClick={() => {
            clickHandler();
            console.log("egihj");
          }}
        >
          <boxBufferGeometry args={[3, 1, 1]} />
          <meshNormalMaterial />
        </instancedMesh>
      );
    }

    return cubes;
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("dasvjhgidv");
  //     clickHandler();
  //     clickHandler();
  //   }, 200);
  // }, []);

  return (
    <>
      <InstancedRigidBodies
        ref={api}
        colliders="ball"
        linearDamping={0}
        angularDamping={0}
        restitution={1.23}
        positions={Array.from({ length: count }, () => [0, 0, 0])}
      >
        {finalObjects}
      </InstancedRigidBodies>
    </>
  );
}

export default CenterObjects;
