import React, { useRef, Suspense } from "react";
import PixelDance from "./PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";
import LazyMount from "../components/LazyMount";

const PixelPerfectionist = () => {
  const mainContainer = useRef();
  const textRef = useRef();

  return (
    <div
      className="pannelContainer"
      ref={mainContainer}
      style={{ height: "180vh" }}
    >
      <div
        className="center "
        style={{ opacity: 1, top: "80vh" }}
        ref={textRef}
      >
        I'm a Pixel Perfectionist
      </div>

      <div
        className="canvasStreach"
        style={{
          height: "180vh",
        }}
      >
        <LazyMount>
          <Canvas camera={{ position: [0, 0, 100] }}>
            <Suspense fallback={null}>
              <PixelDance />
            </Suspense>
          </Canvas>
        </LazyMount>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
