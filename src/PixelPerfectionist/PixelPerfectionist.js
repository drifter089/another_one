import React, { useRef, useEffect, useLayoutEffect, Suspense } from "react";
import PixelDance from "./PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

const PixelPerfectionist = () => {
  const mainContainer = useRef();
  const textRef = useRef();

  const once = useRef(false);

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
          <Suspense fallback={null}>
            <PixelDance />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
