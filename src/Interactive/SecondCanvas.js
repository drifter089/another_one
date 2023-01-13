import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { easing } from "maath";
import ObjectsSphere from "./ObjectsSphere";

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }, delta) => {
    easing.damp3(
      vec,
      [(mouse.x * viewport.width) / 4, (mouse.y * viewport.height) / 4, 0],
      0.1,
      delta,
      Infinity
    );
    ref.current.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody type="kinematicPosition" colliders="ball" ref={ref}>
      <Sphere args={[0.5]}>
        <meshStandardMaterial
          color="green"
          roughness={0}
          envMapIntensity={0.2}
        />
      </Sphere>
    </RigidBody>
  );
}

export default function SecondCanvas() {
  // const mainState = useThree();

  // useEffect(() => {
  //   mainState.gl.setClearColor(new Color(0x000000));
  //   mainState.camera.position.z = 25;
  // }, []);
  return (
    <Physics gravity={[0, 2, 0]}>
      <ObjectsSphere />
      <Pointer />
    </Physics>
  );
}
