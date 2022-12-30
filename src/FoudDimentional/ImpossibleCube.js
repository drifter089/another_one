import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { degToRad } from "three/src/math/MathUtils";
import Portal from "./Portal";

const ImpossibleCube = () => {
  const size = 5;

  const materialRef1 = useRef(null);
  const materialRef2 = useRef(null);
  const materialRef3 = useRef(null);
  const materialRef4 = useRef(null);
  const materialRef5 = useRef(null);
  const materialRef6 = useRef(null);

  const objectRef1 = useRef(null);
  const objectRef2 = useRef(null);
  const objectRef3 = useRef(null);
  const objectRef4 = useRef(null);
  const objectRef5 = useRef(null);
  const objectRef6 = useRef(null);

  const boxGroupRef = useRef();

  useFrame((state) => {
    // boxGroupRef.current.rotation.x = Math.sin(state.clock.elapsedTime);
    // boxGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime);
    // boxGroupRef.current.rotation.z = Math.sin(state.clock.elapsedTime);
  });

  return (
    <>
      <group ref={boxGroupRef}>
        {/* stencilId should be diffrent for every portal */}
        {/* trans:z , rotate x */}
        <Portal
          position={[0, 0, size / 2]}
          rotation={[0, 0, 0]}
          size={size}
          stencilId={1}
        >
          <mesh ref={objectRef1}>
            <boxGeometry args={[2, 2, 2]} />
            <meshNormalMaterial ref={materialRef1} />
          </mesh>
        </Portal>
        <Portal
          position={[0, 0, -size / 2]}
          rotation={[degToRad(-180), 0, 0]}
          size={size}
          stencilId={2}
        >
          <mesh ref={objectRef1}>
            <coneBufferGeometry args={[0.8, 1.3, 20, 2]} />
            <meshNormalMaterial ref={materialRef2} />
          </mesh>
        </Portal>

        {/* trans:y , rotate x  */}
        <Portal
          position={[0, -size / 2, 0]}
          rotation={[degToRad(90), 0, 0]}
          size={size}
          stencilId={3}
        >
          <mesh ref={objectRef2}>
            <dodecahedronBufferGeometry args={[1, 0]} />
            <meshNormalMaterial ref={materialRef3} />
          </mesh>
        </Portal>
        <Portal
          position={[0, size / 2, 0]}
          rotation={[degToRad(-90), 0, 0]}
          size={size}
          stencilId={4}
        >
          <mesh ref={objectRef3}>
            <octahedronBufferGeometry args={[1, 0]} />
            <meshNormalMaterial ref={materialRef4} />
          </mesh>
        </Portal>

        {/* translate x, rotate y */}
        <Portal
          position={[-size / 2, 0, 0]}
          rotation={[0, degToRad(-90), 0]}
          size={size}
          stencilId={5}
        >
          <mesh ref={objectRef4}>
            <torusBufferGeometry args={[0.8, 0.3, 12, 24]} />
            <meshNormalMaterial ref={materialRef5} />
          </mesh>
        </Portal>
        <Portal
          position={[size / 2, 0, 0]}
          rotation={[0, degToRad(90), 0]}
          size={size}
          stencilId={6}
        >
          <mesh ref={objectRef5}>
            <cylinderGeometry args={[0.5, 0.5, 2]} />
            <meshNormalMaterial ref={materialRef6} />
          </mesh>
        </Portal>
        <mesh ref={objectRef6}>
          <boxGeometry args={[5, 5, 5]} />
          <meshBasicMaterial color={"green"} wireframe />
        </mesh>
      </group>

      <OrbitControls />
    </>
  );
};

export default ImpossibleCube;
