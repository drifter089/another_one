import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  Suspense,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import PicturePlanes from "./PicturePlanes";
import { degToRad } from "three/src/math/MathUtils";
import reading from ".././assets/illustrations/reading.svg";
import chess from ".././assets/illustrations/chess.svg";
import gaming from ".././assets/illustrations/gaming.svg";
import stargazing from ".././assets/illustrations/stargazing.svg";
import singing from ".././assets/illustrations/singing.svg";
import hiking from ".././assets/illustrations/hiking.svg";
import sunset from ".././assets/illustrations/sunset.svg";
import coding from ".././assets/illustrations/coding.svg";

import Blob from "./Blob/Blob";
import LazyMount from "../components/LazyMount";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const helixImages = [
  reading,
  chess,
  stargazing,
  gaming,
  sunset,
  singing,
  hiking,
  coding,
];

const AnimationStage = React.forwardRef(({ radius, yOffset }, ref) => {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y = ref.current.rotation.y;
    groupRef.current.position.y = ref.current.position.y;
  });

  return (
    <group position={[0, -12, 0]} ref={groupRef}>
      <PicturePlanes radius={radius} yOffset={yOffset} imagee={helixImages} />
    </group>
  );
});

const ImageHelixScroller = () => {
  const [pinHelixCanvas, setPinHelixCanvas] = useState(false);

  const canvasRelativeParentRef = useRef();
  const canvasDivRef = useRef();

  const radius = 7;
  const yOffset = 3;

  const animationDataRef = useRef({
    rotation: {
      y: 0,
    },
    position: {
      y: -yOffset * 4,
    },
  });

  useEffect(() => {
    if (pinHelixCanvas) {
      canvasDivRef.current.classList.add("pinCanvas");
    } else {
      canvasDivRef.current.classList.remove("pinCanvas");
    }
  }, [pinHelixCanvas]);

  useLayoutEffect(() => {
    const myTemp = gsap.timeline();

    let theta = 0;
    let yOffsetCurrent = -yOffset * 4;
    for (let i = 0; i < 7; i++) {
      theta = theta + 45;
      yOffsetCurrent = yOffsetCurrent + yOffset;

      myTemp
        .to(animationDataRef.current.rotation, {
          y: degToRad(theta),
        })
        .to(
          animationDataRef.current.position,
          {
            y: yOffsetCurrent,
          },
          "<"
        );
    }

    const trigger = ScrollTrigger.create({
      animation: myTemp,
      trigger: canvasRelativeParentRef.current,
      start: "0% 0%",
      end: "800% 0%",
      scrub: 1,
      // markers: true,
      onEnter: () => {
        setPinHelixCanvas(true);
      },
      onLeave: () => {
        setPinHelixCanvas(false);
      },
      onEnterBack: () => {
        setPinHelixCanvas(true);
      },
      onLeaveBack: () => {
        setPinHelixCanvas(false);
      },
    });

    return () => {
      trigger.kill();
      myTemp.kill();
    };
  }, []);

  return (
    <>
      <div className="lastOverlayHelix">Yet make free time</div>

      <div className="pannelContainer" ref={canvasRelativeParentRef}>
        <div className="helixCanvasContainer" ref={canvasDivRef}>
          <LazyMount>
            <Canvas
              camera={{ position: [12.0, 0, 0] }}
              style={{
                width: "100vw",
                height: "100vh",
                zIndex: 10,
              }}
            >
              <Suspense fallback={null}>
                <Blob />
                <AnimationStage
                  radius={radius}
                  yOffset={yOffset}
                  ref={animationDataRef}
                />
              </Suspense>
            </Canvas>
          </LazyMount>
        </div>
      </div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer ">
        <div className="lastOverlayHelix">and</div>
      </div>
    </>
  );
};

export default ImageHelixScroller;
