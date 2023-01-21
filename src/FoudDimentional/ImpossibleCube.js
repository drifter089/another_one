import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useMemo, useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import Portal from "./Portal";
import { Text3D } from "@react-three/drei";
import fontFile from "../assets/fonts/Secular.json";
import { Model } from "./Model";
import { Color } from "three";

function ImpossibleCube() {
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

  const skeleton = useRef(null);

  const boxGroupRef = useRef();

  const config = useMemo(
    () => ({
      size: 1.2,
      height: 0.3,
      curveSegments: 15,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 4,
    }),
    []
  );

  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000), 0);
  });

  useFrame((state) => {
    boxGroupRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    boxGroupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    boxGroupRef.current.rotation.z = state.clock.elapsedTime * 0.3;

    //
    // objectRef1.current.rotation.x = state.clock.elapsedTime * 0.3;
    // objectRef1.current.rotation.y = state.clock.elapsedTime * 0.5;
    // objectRef1.current.rotation.z = state.clock.elapsedTime * 0.3;
    //
    objectRef2.current.rotation.x = state.clock.elapsedTime * 0.3;
    objectRef2.current.rotation.y = state.clock.elapsedTime * 0.8;
    objectRef2.current.rotation.z = state.clock.elapsedTime * 0.3;
    //
    objectRef3.current.rotation.x = state.clock.elapsedTime * 0.3;
    objectRef3.current.rotation.y = state.clock.elapsedTime * 0.1;
    objectRef3.current.rotation.z = state.clock.elapsedTime * 0.3;
    //
    objectRef4.current.rotation.x = state.clock.elapsedTime * 0.3;
    objectRef4.current.rotation.y = state.clock.elapsedTime * 0.9;
    objectRef4.current.rotation.z = state.clock.elapsedTime * 0.3;
    //
    objectRef5.current.rotation.x = state.clock.elapsedTime * 0.2;
    objectRef5.current.rotation.y = state.clock.elapsedTime * 0.4;
    objectRef5.current.rotation.z = state.clock.elapsedTime * 0.3;
    //
    objectRef6.current.rotation.x = state.clock.elapsedTime * 0.3;
    objectRef6.current.rotation.y = state.clock.elapsedTime * 0.7;
    objectRef6.current.rotation.z = state.clock.elapsedTime * 0.8;
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
          <Text3D
            {...config}
            font={fontFile}
            key={2}
            position={[-1, -0.3, 0]}
            ref={objectRef1}
          >
            {"4D"}
            <meshNormalMaterial ref={materialRef1} />
          </Text3D>
          {/* <mesh ref={objectRef1}>
            <boxGeometry args={[2, 2, 2]} />
            <meshNormalMaterial ref={materialRef1} />
          </mesh> */}
        </Portal>
        <Portal
          position={[0, 0, -size / 2]}
          rotation={[degToRad(-180), 0, 0]}
          size={size}
          stencilId={2}
        >
          <mesh ref={objectRef6}>
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
        <Model scale={[2.5, 2.5, 2.5]} ref={skeleton} />
      </group>

      <OrbitControls enableDamping={true} enableZoom={false} />
    </>
  );
}

export default ImpossibleCube;
