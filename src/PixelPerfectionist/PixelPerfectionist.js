import React, { useRef, useEffect } from "react";
import PixelDance from "../PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PixelPerfectionist = () => {
  const mainContainer = useRef();
  const coverScreenRef = useRef();
  const textRef = useRef();

  const once = useRef(false);

  // useEffect(() => {
  //   if (!once.current) {
  //     once.current = true;
  //     setTimeout(() => {
  //       const myTimeline = gsap.timeline();

  //       myTimeline
  //         // .to(coverScreenRef.current, {
  //         //   opacity: 0,
  //         // })
  //         .to(textRef.current, {
  //           opacity: 1,
  //         });

  //       ScrollTrigger.create({
  //         animation: myTimeline,
  //         trigger: mainContainer.current,
  //         markers: true,
  //         start: "100% 100%",
  //         end: "100% 0%",
  //         pin: mainContainer.current,
  //         scrub: 2,
  //         pinSpacing: true,
  //       });
  //     }, 1000);
  //   }
  // });

  return (
    <div className="pannelContainer" ref={mainContainer}>
      {/* <div
        className="pannelContainer"
        style={{ backgroundColor: "pink", opacity: 1, zIndex: 2 }}
        ref={coverScreenRef}
      /> */}
      <div
        className="center purpleText"
        style={{ position: "absolute", opacity: 0 }}
        ref={textRef}
      >
        I am a Pixel Perfectionist
      </div>

      <div className="canvasStreach">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <PixelDance />
        </Canvas>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
