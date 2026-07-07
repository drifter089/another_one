import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  Suspense,
} from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, AxesHelper } from "three";
import PicturePlanes from "./PicturePlanes";
import { degToRad } from "three/src/math/MathUtils";
import books from ".././assets/images/books.jpg";
import chess from ".././assets/images/chess.jpg";
import games from ".././assets/images/games.jpg";
import stars from ".././assets/images/stars.jpg";
import singing from ".././assets/images/singing.jpg";
import hinking from ".././assets/images/hiking.jpg";
import sunset from ".././assets/images/sunset.jpg";

import Blob from "./Blob/Blob";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const AnimationStage = React.forwardRef(({ radius, yOffset }, ref) => {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.rotation.y = ref.current.rotation.y;
    groupRef.current.position.y = ref.current.position.y;
  });

  return (
    <>
      <group position={[0, -12, 0]} ref={groupRef}>
        <PicturePlanes
          radius={radius}
          yOffset={yOffset}
          imagee={[books, chess, stars, games, sunset, singing, hinking, chess]}
        />
      </group>
      {/* <OrbitControls /> */}
    </>
  );
});

const ImageHelixScroller = () => {
  const [pinHelixCanvas, setPinHelixCanvas] = useState(false);

  const canvasRelativeParentRef = useRef();
  const canvasDivRef = useRef();

  const once = useRef(false);

  const radius = 7;
  let yOffset = 3;
  let yOffsetCurrent = -yOffset * 4;
  let theta = 0;

  const animationDataRef = useRef({
    rotation: {
      y: 0,
    },
    position: {
      y: yOffsetCurrent,
    },
  });

  useEffect(() => {
    if (pinHelixCanvas) {
      canvasDivRef.current.classList.add("pinCanvas");
      console.log("pinned");
    } else {
      canvasDivRef.current.classList.remove("pinCanvas");
      console.log("removed");
    }
  }, [pinHelixCanvas]);

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      const myTemp = gsap.timeline();

      console.log("reeeeeeeeeeeeeeen");
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

      ScrollTrigger.create({
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
    }
  }, []);

  return (
    <>
      <div className="lastOverlayHelix">Yet make free time</div>

      <div className="pannelContainer" ref={canvasRelativeParentRef}>
        <div className="helixCanvasContainer" ref={canvasDivRef}>
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
