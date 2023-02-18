import React, { useRef, useEffect } from "react";
import PixelDance from "../PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PixelPerfectionist = () => {
  const mainContainer = useRef();
  const textRef = useRef();

  return (
    <div
      className="pannelContainer"
      ref={mainContainer}
      style={{ height: "300vh" }}
    >
      <div
        className="center "
        style={{ opacity: 1, top: "130vh" }}
        ref={textRef}
      >
        I'm a Pixel Perfectionist
      </div>

      <div
        className="canvasStreach"
        style={{
          height: "300vh",
        }}
      >
        <Canvas camera={{ position: [0, 0, 100] }}>
          <PixelDance />
        </Canvas>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
