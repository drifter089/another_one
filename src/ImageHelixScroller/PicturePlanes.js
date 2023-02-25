import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import { useThree } from "@react-three/fiber";
import { AxesHelper, Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";

const PicturePlanes = (props) => {
  const planeRef = useRef();

  const { scene, camera } = useThree();
  const axesHelper = new AxesHelper(10);
  axesHelper.setColors("red", "green", "blue");
  scene.add(axesHelper);

  const finalObjects = useMemo(() => {
    const cubes = [];

    let numOfObj = 8;
    let tempKey = 0;

    let theta = 0;
    let radius = props.radius;
    // let yOffSet = props.yOffSet;
    let yOffSet = 3;
    let yCurrent = 4 * yOffSet;

    let refArr = [];

    for (let i = 0; i < numOfObj; i++) {
      const ref = React.createRef(null);

      tempKey++;

      let x = radius * Math.cos(degToRad(theta));
      let z = radius * Math.sin(degToRad(theta));

      let pos = [x, yCurrent, z];
      let lookingAt = new Vector3(2 * radius * x, 0, 2 * radius * z);

      theta = theta + 45;
      yCurrent = yCurrent - yOffSet;

      cubes.push(
        <mesh
          position={pos}
          ref={planeRef}
          onUpdate={(self) => {
            self.lookAt(lookingAt);
          }}
          key={tempKey}
        >
          <planeGeometry args={[3, 2, 12, 12]} />
          <meshNormalMaterial side={DoubleSide} />
        </mesh>
      );
    }

    return cubes;
  }, []);

  return <>{finalObjects}</>;
};

export default PicturePlanes;
