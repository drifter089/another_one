import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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

  //    const planeGeometry1 = new PlaneGeometry(size, size, 1);
  //    const planeGeometry2 = new PlaneGeometry(size, size, 1);
  //    const planeGeometry3 = new PlaneGeometry(size, size, 1);
  //    const planeGeometry4 = new PlaneGeometry(size, size, 1);
  //    const planeGeometry5 = new PlaneGeometry(size, size, 1);
  //    const planeGeometry6 = new PlaneGeometry(size, size, 1);

  //    planeGeometry2.rotateY(Math.PI / 2);
  //    planeGeometry3.rotateY(Math.PI);
  //    planeGeometry4.rotateY(-Math.PI / 2);
  //    planeGeometry5.rotateX(Math.PI / 2);
  //    planeGeometry6.rotateX(-Math.PI / 2);

  //    planeGeometry2.translate(size / 2, 0, size / 2);
  //    planeGeometry3.translate(-size / 2, 0, size / 2);
  //    planeGeometry4.translate(-size / 2, 0, -size / 2);
  //    planeGeometry5.translate(0, size / 2, size / 2);
  //    planeGeometry6.translate(0, -size / 2, size / 2);

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
    >
      {/* stencilId should be diffrent for every portal */}
      {/* trans:z , rotate x */}
      <Portal
        position={[0, 0, size / 2]}
        rotation={[0, 0, 0]}
        size={size}
        stencilId={1}
      >
        <mesh>
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
        <mesh>
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
        <mesh>
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
        <mesh>
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
        <mesh>
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
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 2]} />
          <meshNormalMaterial ref={materialRef6} />
        </mesh>
      </Portal>
      <mesh>
        <boxGeometry args={[5, 5, 5]} />
        <meshBasicMaterial color={"green"} wireframe />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};

export default ImpossibleCube;
