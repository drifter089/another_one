import React, { useRef, useEffect, useLayoutEffect, Suspense } from "react";
import PixelDance from "./PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PixelPerfectionist = () => {
  const mainContainer = useRef();
  const textRef = useRef();

  const once = useRef(false);

  // useLayoutEffect(() => {
  //   if (!once.current) {
  //     once.current = true;

  //     const myTemp = gsap.timeline();

  //     setTimeout(() => {
  //       myTemp
  //         .to(textRef.current, {
  //           opacity: 1,
  //         })
  //         .to(textRef.current, {
  //           opacity: 0,
  //         });

  //       ScrollTrigger.create({
  //         animation: myTemp,
  //         trigger: mainContainer.current,
  //         start: "50% 100%",
  //         end: "50% 20%",
  //         scrub: 2,
  //         // markers: true,
  //       });
  //     }, 2000);
  //   }
  // }, []);

  return (
    <Suspense fallback={null}>
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
    </Suspense>
  );
};

export default PixelPerfectionist;
