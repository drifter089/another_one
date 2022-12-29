import React, { useMemo, useState } from "react";
import { Text3D } from "@react-three/drei";
import fontFile from "../assets/fonts/Secular.json";

const CenterText = (props) => {
  const [wordsArr, setWordsArr] = useState(["THREE", "MEDIUM", "WORDS"]);
  const config = useMemo(
    () => ({
      size: 1,
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
  const elems = useMemo(() => {
    return (
      <>
        <Text3D {...config} font={fontFile} key={1} position={[-1.6, 1.5, 0]}>
          {wordsArr[0]}
          <meshNormalMaterial />
        </Text3D>
        <Text3D {...config} font={fontFile} key={2} position={[-2, 0, 0]}>
          {wordsArr[1]}
          <meshNormalMaterial />
        </Text3D>
        <Text3D {...config} font={fontFile} key={3} position={[-1.6, -1.5, 0]}>
          {wordsArr[2]}
          <meshNormalMaterial />
        </Text3D>
      </>
    );
  }, []);
  return <>{elems}</>;
};

export default CenterText;
