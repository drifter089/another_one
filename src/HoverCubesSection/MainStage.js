import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  Suspense,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AxesHelper, Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";

import ClickyCubes from "./ClickyCubes/ClickyCubes";

import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import { Timeline } from "gsap/gsap-core";
// gsap.registerPlugin(ScrollTrigger);

const MainStage = () => {
  const [selectedHTML, setSelectedHTML] = useState(-1);

  const textRef1 = React.createRef();
  const textRef2 = React.createRef();
  const textRef3 = React.createRef();
  const textRef4 = React.createRef();
  const textRef5 = React.createRef();
  const textRef6 = React.createRef();

  const textRefArr = useMemo(() => {
    return [textRef1, textRef2, textRef3, textRef4, textRef5, textRef6];
  }, []);

  const m1 = new Timeline({ paused: true });
  const m2 = new Timeline({ paused: true });
  const m3 = new Timeline({ paused: true });
  const m4 = new Timeline({ paused: true });
  const m5 = new Timeline({ paused: true });
  const m6 = new Timeline({ paused: true });

  const opacityTimeLineArr = useMemo(() => [m1, m2, m3, m4, m5, m6], []);

  function makeOpacityTimeLine(ref, timeline) {
    timeline.to(ref.current, {
      opacity: 1,
      duration: 0.5,
      delay: 0.6,
    });
  }

  const once = useRef(false);

  const btnRef = useRef();

  useEffect(() => {
    // if (!once.current) {
    setTimeout(() => {
      once.current = true;
      textRefArr.map((ref, i) => {
        makeOpacityTimeLine(ref, opacityTimeLineArr[i]);
      });
    }, 800);
    // }
  }, []);

  useEffect(() => {
    console.log("selected html", selectedHTML);
    if (selectedHTML != -1) {
      opacityTimeLineArr[selectedHTML].play();
      gsap.to(btnRef.current, { opacity: 1, duration: 0.5 });
    }
    return () => {
      if (selectedHTML != -1) {
        opacityTimeLineArr[selectedHTML].reverse();
        gsap.to(btnRef.current, { opacity: 0, duration: 0.5 });
      }
      console.log("chsnged to html", selectedHTML);
    };
  }, [selectedHTML]);

  return (
    <>
      <div className="pannelContainer textAlCenter">
        {/* <div
          style={{
            position: "relative",
            top: "40vh",
            textAlign: "center",
          }}
        >
          Still not convinced ..?
        </div> */}
        <div
          style={{
            position: "relative",
            top: "75vh",
            textAlign: "center",
          }}
        >
          click me!
        </div>
      </div>
      <div
        className="pannelContainer"
        style={{
          zIndex: 5,
        }}
      >
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ClickyCubes selected={selectedHTML} setSelected={setSelectedHTML} />
        </Canvas>
        <div className="canvasStreach reasonText" ref={textRef1}>
          I have a vast collection of cat-related programming memes that will
          keep the team motivated.
        </div>
        <div className="canvasStreach reasonText" ref={textRef2}>
          I can write code in my sleep, so I'll be able to work on projects
          24/7.
        </div>
        <div className="canvasStreach reasonText" ref={textRef3}>
          I never miss an oppurtunity to tell "that's what she said " jokes.
        </div>
        <div className="canvasStreach reasonText" ref={textRef4}>
          too good at procrastination and ends up finishing everything at the
          last minute.
        </div>
        <div className="canvasStreach reasonText" ref={textRef5}>
          might get too competitive during office game breaks..
        </div>
        <div className="canvasStreach reasonText" ref={textRef6}>
          I never feel sleepy during afternoon conference calls.
        </div>

        <div
          id="cross"
          // className="myBtn circle"
          onClick={() => {
            setSelectedHTML(-1);
          }}
          ref={btnRef}
        ></div>
      </div>
    </>
  );
};

export default MainStage;
