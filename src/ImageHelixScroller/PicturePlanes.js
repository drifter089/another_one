import React, { useRef, useMemo } from "react";
import { Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { useTexture } from "@react-three/drei";

function ImageMaterial({ imagee }) {
  const texture = useTexture(imagee);
  return <meshBasicMaterial map={texture} side={DoubleSide} />;
}

const PicturePlanes = (props) => {
  const planeRef = useRef();

  const finalObjects = useMemo(() => {
    const cubes = [];

    let numOfObj = 8;
    let tempKey = 0;

    let theta = 0;
    let radius = props.radius;
    // let yOffSet = props.yOffSet;
    let yOffSet = 3;
    let yCurrent = 4 * yOffSet;

    for (let i = 0; i < numOfObj; i++) {
      tempKey++;

      let x = radius * Math.cos(degToRad(theta));
      let z = radius * Math.sin(degToRad(theta));

      let pos = [x, yCurrent, z];
      let lookingAt = new Vector3(2 * radius * x, 0, 2 * radius * z);

      theta = theta + 45;
      yCurrent = yCurrent - yOffSet;

      if (i === 7) {
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
            <meshNormalMaterial transparent={true} opacity={0} />
          </mesh>
        );
      } else {
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
            <ImageMaterial imagee={props.imagee[i]} />
            {/* <meshNormalMaterial  /> */}
          </mesh>
        );
      }
    }

    return cubes;
  }, [props.radius, props.imagee]);

  return <>{finalObjects}</>;
};

export default PicturePlanes;
