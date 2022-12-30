import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function FlyingObjects() {
  /**
   * executes after 3 sec
   */

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      animation();
    }, 3000);
    return () => clearInterval(interval);
  }, [count]);

  /**
   *
   */
  const finalObjects = useMemo(() => {
    const cubes = [];
    // totl will be 5 times
    let numPerObj = 16;
    let tempKey = 0;

    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <mesh ref={ref} position={[0, 0, 0]} key={tempKey}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <mesh ref={ref} position={[0, 0, 0]} key={tempKey}>
          <coneBufferGeometry args={[0.8, 1.3, 20, 2]} />
          <meshNormalMaterial />
        </mesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <mesh ref={ref} position={[0, 0, 0]} key={tempKey}>
          <dodecahedronBufferGeometry args={[1, 0]} />
          <meshNormalMaterial />
        </mesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <mesh ref={ref} position={[0, 0, 0]} key={tempKey}>
          <octahedronBufferGeometry args={[1, 0]} />
          <meshNormalMaterial />
        </mesh>
      );
    }
    for (let i = 0; i < numPerObj; i++) {
      const ref = React.createRef(null);
      tempKey++;
      cubes.push(
        <mesh ref={ref} position={[0, 0, 0]} key={tempKey}>
          <torusBufferGeometry args={[0.8, 0.3, 12, 24]} />
          <meshNormalMaterial />
        </mesh>
      );
    }

    return cubes;
  }, []);

  const animation = useCallback(() => {
    finalObjects.map((cube) => {
      const dist = 15;
      const x = Math.random() * (2 * dist) - dist;
      const y = Math.random() * (2 * dist) - dist;
      const z = Math.random() * (2 * dist) - dist;
      const { current: mesh } = cube.ref;
      gsap.to(mesh.position, { duration: 2.5, x: x, y: y, z: z });
      gsap.to(mesh.rotation, { duration: 2.5, x: x, y: y, z: z });
    });
  }, [finalObjects]);

  useFrame((state) => {
    // state.camera.lookAt([0, 0, 0]);
  });

  useEffect(() => {
    animation();
  }, []);

  return finalObjects;
}

export default FlyingObjects;
