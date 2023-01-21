import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { easing } from "maath";
import ObjectsSphere from "./ObjectsSphere";

function Pointer({ vec = new THREE.Vector3(0, -2, 0) }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }, delta) => {
    easing.damp3(
      vec,
      [(mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0],
      0.1,
      delta,
      Infinity
    );
    ref.current.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <Sphere args={[0.6]}>
        <meshBasicMaterial
          color="pink"
          roughness={0}
          envMapIntensity={0.2}
          transparent={true}
          opacity={1}
        />
      </Sphere>
    </RigidBody>
  );
}

export default function SecondCanvas() {
  return (
    <Physics gravity={[0, 2, 0]}>
      <ObjectsSphere />
      <Pointer />
    </Physics>
  );
}
