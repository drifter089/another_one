import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Sphere } from "@react-three/drei";
import { InstancedRigidBodies, Physics, RigidBody } from "@react-three/rapier";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { easing } from "maath";
import ObjectsSphere from "./ObjectsSphere";

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }, delta) => {
    easing.damp3(
      vec,
      [(mouse.x * viewport.width) / 6, (mouse.y * viewport.height) / 6, 0],
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

function Effects(props) {
  return (
    <EffectComposer {...props}>
      <SSAO radius={0.2} intensity={20} color="blue" />
    </EffectComposer>
  );
}

export default function SecondCanvas() {
  // const mainState = useThree();

  // useEffect(() => {
  //   mainState.gl.setClearColor(new Color(0x000000));
  //   mainState.camera.position.z = 25;
  // }, []);
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
      shadows
      camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 50 }}
      onCreated={(state) => {
        state.scene.backgroundBlurriness = 0.4;
      }}
    >
      <ambientLight intensity={1} />
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[30, 30, 30]}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight
        intensity={10}
        position={[-10, -10, -10]}
        color="purple"
      />
      <Physics gravity={[0, 2, 0]}>
        <ObjectsSphere />
        <Pointer />
      </Physics>
      <Effects />
    </Canvas>
  );
}
