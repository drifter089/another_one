import React, { useRef, useEffect, useLayoutEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";

import ClickyCubes from "./ClickyCubes/ClickyCubes";

import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";

const MainStage = () => {
  const [selectedHTML, setSelectedHTML] = useState(-1);

  const textRefArr = useMemo(
    () => Array.from({ length: 6 }, () => React.createRef()),
    []
  );

  const opacityTimeLineArr = useMemo(
    () => Array.from({ length: 6 }, () => new Timeline({ paused: true })),
    []
  );

  const btnRef = useRef();

  useLayoutEffect(() => {
    textRefArr.forEach((ref, i) => {
      opacityTimeLineArr[i].to(ref.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.6,
      });
    });

    return () => {
      opacityTimeLineArr.forEach((timeline) => timeline.clear());
    };
  }, [textRefArr, opacityTimeLineArr]);

  useEffect(() => {
    const btn = btnRef.current;
    if (selectedHTML !== -1) {
      opacityTimeLineArr[selectedHTML].play();
      gsap.to(btn, { opacity: 1, duration: 0.5 });
    }
    return () => {
      if (selectedHTML !== -1) {
        opacityTimeLineArr[selectedHTML].reverse();
        gsap.to(btn, { opacity: 0, duration: 0.5 });
      }
    };
  }, [selectedHTML, opacityTimeLineArr]);

  return (
    <>
      <div className="pannelContainer textAlCenter">
        <div
          style={{
            position: "relative",
            top: "40vh",
            textAlign: "center",
          }}
        >
          Still not convinced ..?
        </div>
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
        <div className="canvasStreach reasonText" ref={textRefArr[0]}>
          I have a vast collection of cat-related programming memes that will
          keep the team motivated.
        </div>
        <div className="canvasStreach reasonText" ref={textRefArr[1]}>
          I can write code in my sleep, so I'll be able to work on projects
          24/7.
        </div>
        <div className="canvasStreach reasonText" ref={textRefArr[2]}>
          I never miss an oppurtunity to tell "that's what she said " jokes.
        </div>
        <div className="canvasStreach reasonText" ref={textRefArr[3]}>
          too good at procrastination and ends up finishing everything at the
          last minute.
        </div>
        <div className="canvasStreach reasonText" ref={textRefArr[4]}>
          might get too competitive during office game breaks..
        </div>
        <div className="canvasStreach reasonText" ref={textRefArr[5]}>
          I never feel sleepy during afternoon conference calls.
        </div>

        <div
          id="cross"
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
