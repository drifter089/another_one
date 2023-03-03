import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AxesHelper, Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";

import ClickyCubes from "./ClickyCubes/ClickyCubes";

const MainStage = () => {
  const [selectedHTML, setSelectedHTML] = useState(-1);

  useEffect(() => {
    console.log("selected html", selectedHTML);
    return () => {
      console.log("chsnged to html", selectedHTML);
    };
  }, [selectedHTML]);

  return (
    <div className="pannelContainer">
      <Canvas camera={{ position: [0, 0, 20] }}>
        <ClickyCubes setSelectedHTML={setSelectedHTML} />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default MainStage;
