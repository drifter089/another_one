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

  useEffect(() => {
    if (!once.current) {
      console.log("wvre");
      // const rand
      gsap.from(
        [
          toptext.current,
          boldText1.current,
          boldText2.current,
          boldText3.current,
        ],

        {
          y: "100vh",
          stagger: 0.1,
          rotateX: 20,
          rotateY: 40,
          rotateZ: 80,
          scrollTrigger: {
            trigger: mainContainer.current,
            markers: true,

            start: "100% 100%",
            end: "100% 0%",
            pin: mainContainer.current,
            scrub: 2,
            // toggleActions: "restart restart none none",
          },
        }
      );
      // gsap.to(
      //   [
      //     toptext.current,
      //     boldText1.current,
      //     boldText2.current,
      //     boldText3.current,
      //   ],
      //   {
      //     y: "-100vh",
      //     stagger: 0.1,
      //     rotateX: 20,
      //     rotateY: 40,
      //     rotateZ: 80,
      //     scrollTrigger: {
      //       trigger: mainContainer.current,
      //       markers: true,

      //       start: "50% 50%",
      //       end: "50% 0%",
      //       pin: mainContainer.current,
      //       scrub: 2,
      //       // toggleActions: "restart restart none none",
      //     },
      //   }
      // );
      once.current = true;
    }
  }, []);

  useLayoutEffect(() => {});

  return (
    <div className="pannelContainer" ref={mainContainer}>
      <div className="center" style={{ top: "25%" }}>
        <div ref={toptext}>SAY HI TO YOUR</div>
        <div style={{ fontSize: "130px", paddingTop: "30px" }} ref={boldText1}>
          NEWEST
        </div>
        <div style={{ fontSize: "130px", paddingTop: "30px" }} ref={boldText2}>
          TEAM
        </div>
        <div style={{ fontSize: "130px", paddingTop: "30px" }} ref={boldText3}>
          MEMBER
        </div>
      </div>
      {/* canvas div */}
      <div ref={canvasRef} className="canvasStreach">
        <Canvas
          className="canvasStreach"
          camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 50 }}
        >
          <ShaderPlane />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
