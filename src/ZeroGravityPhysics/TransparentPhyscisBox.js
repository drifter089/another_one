import React from "react";
import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { DoubleSide, AxesHelper } from "three";
import { useMemo } from "react";
import { degToRad } from "three/src/math/MathUtils";

const TransparentPhyscisBox = () => {
  const length = 25;

  /**
   * adding axis helper
   */
  // const { scene, camera } = useThree();
  // const axesHelper = new AxesHelper(10);
  // axesHelper.setColors("red", "green", "blue");
  // scene.add(axesHelper);

  return (
    <>
      <RigidBody>
        <mesh position={[-length / 2, 0, 0]} rotation={[0, degToRad(90), 0]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[length / 2, 0, 0]} rotation={[0, degToRad(-90), 0]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, 0, -length / 2]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, 0, length / 2]} rotation={[0, degToRad(180), 0]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, -length / 2, 0]} rotation={[degToRad(-90), 0, 0]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh position={[0, length / 2, 0]} rotation={[degToRad(90), 0, 0]}>
          <planeGeometry args={[length, length]} />
          <meshNormalMaterial transparent={true} opacity={0} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default TransparentPhyscisBox;
