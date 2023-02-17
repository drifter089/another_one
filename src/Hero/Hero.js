import React, { useEffect, useLayoutEffect, useRef } from "react";
import ShaderPlane from "../ShaderPlane/ShaderPlane";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const canvasRef = useRef();
  const mainContainer = useRef();

  const toptext = useRef();
  const boldText1 = useRef();
  const boldText2 = useRef();
  const boldText3 = useRef();

  const once = useRef(false);

  // useEffect(() => {
  //   if (!once.current) {
  //     gsap.from(
  //       [
  //         toptext.current,
  //         boldText1.current,
  //         boldText2.current,
  //         boldText3.current,
  //       ],

  //       {
  //         y: "100vh",
  //         stagger: 0.1,
  //         rotateX: 20,
  //         rotateY: 40,
  //         rotateZ: 80,
  //         scrollTrigger: {
  //           trigger: mainContainer.current,
  //           markers: true,

  //           start: "200% 200%",
  //           end: "200% 0%",
  //           pin: mainContainer.current,
  //           scrub: 2,
  //           // toggleActions: "restart restart none none",
  //         },
  //       }
  //     );
  //     once.current = true;
  //   }
  // }, []);

  return (
    <>
      <div className="pannelContainer" ref={mainContainer}>
        {/* <div
          style={{ top: 0, left: 0, backgroundColor: "grey", opacity: 0.2 }}
          className="pannelContainer"
        ></div> */}
        <div className="center" style={{ top: "36%" }}>
          <div ref={toptext}>Meet your next creative developer.</div>
        </div>
        {/* canvas div */}
        <div ref={canvasRef} className="canvasStreach">
          <Canvas
            className="canvasStreach"
            style={{
              opacity: 0.8,
              height: "200vh",
            }}
            camera={{ position: [0, 0, 120], fov: 35, near: 0.1, far: 120 }}
          >
            <ShaderPlane />
          </Canvas>
        </div>
      </div>
      <div
        className="pannelContainer"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0),rgba(0,0,0,1))",
          zIndex: 10,
        }}
      ></div>
    </>
  );
};

export default Hero;