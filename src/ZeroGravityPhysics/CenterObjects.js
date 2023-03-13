import React, { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { useState } from "react";

function CenterObjects({
  count = 12,
  vec = new THREE.Vector3(),
  setClickedOnce,
}) {
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new THREE.Color(0x000000), 0);
  }, []);

  const forceConstant = 80;

  const rigidRef1 = useRef();
  const rigidRef2 = useRef();
  const rigidRef3 = useRef();
  const rigidRef4 = useRef();
  const rigidRef5 = useRef();
  const rigidRef6 = useRef();
  const rigidRef7 = useRef();
  const rigidRef8 = useRef();
  const rigidRef9 = useRef();
  const rigidRef10 = useRef();
  const rigidRef11 = useRef();
  const rigidRef12 = useRef();

  const rigidRefsArr = useMemo(() => {
    return [
      rigidRef1,
      rigidRef2,
      rigidRef3,
      rigidRef4,
      rigidRef5,
      rigidRef6,
      rigidRef7,
      rigidRef8,
      rigidRef9,
      rigidRef10,
      rigidRef11,
      rigidRef12,
    ];
  });

  function clickHandler() {
    setClickedOnce(true);
    rigidRefsArr.forEach((body) => {
      const x = (Math.random() - 0.5) * forceConstant;
      const y = (Math.random() - 0.5) * forceConstant;
      const z = (Math.random() - 0.5) * forceConstant;

      body.current.applyImpulse({ x: x, y: y, z: z });
    });
  }

  const finalObjects = useMemo(() => {
    const cubes = [];
    let tempKey = 0;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      tempKey++;
      cubes.push(
        <RigidBody
          ref={rigidRefsArr[i]}
          position={[x, y, z]}
          restitution={1.3}
          angularDamping={0.4}
          key={tempKey}
        >
          <mesh onClick={clickHandler} rotation={[x, y, z]}>
            <boxBufferGeometry args={[3, 1, 1]} />
            <meshNormalMaterial />
          </mesh>
        </RigidBody>
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
      {/* <InstancedRigidBodies
        ref={api}
        colliders="ball"
        linearDamping={0}
        angularDamping={0}
        restitution={1.23}
      > */}
      {finalObjects}
      {/* </InstancedRigidBodies> */}
    </>
  );
}

export default CenterObjects;
