import React, { useLayoutEffect, useRef, useState } from "react";
import sexy_gradient from "../assets/images/combined_gradient.png";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const VisibleSection = () => {
  return (
    <div
      style={{
        textAlign: "center",
      }}
      className="mount"
    >
      <span
        style={{
          color: "black",
          position: "relative",
          display: "block",
          top: "40%",
        }}
      >
        I can bring your ideas to life.
      </span>
    </div>
  );
};

const BlackTextSection = () => {
  const once = useRef(false);

  const lastImgRef = useRef();

  const [hideText, setHideText] = useState(false);

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;

      const myTemp = gsap.timeline();

      setTimeout(() => {
        myTemp
          .to(lastImgRef.current, {
            opacity: 1,
          })
          .to(lastImgRef.current, {
            opacity: 1,
          });

        ScrollTrigger.create({
          animation: myTemp,
          trigger: lastImgRef.current,
          start: "0% 50%",
          end: "100% 50%",
          scrub: 2,
          // markers: true,
          onEnter: () => {
            setHideText(true);
            console.log("enter");
          },
          onLeave: () => {
            setHideText(false);
            console.log("left");
          },
          onEnterBack: () => {
            setHideText(true);
            console.log("enterback");
          },
          onLeaveBack: () => {
            setHideText(false);
            console.log("leaveback");
          },
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="pannelContainer"></div>
      <div style={{ position: "relative" }}>
        {hideText ? <VisibleSection /> : <></>}
        <div
          className="pannelContainer"
          style={{
            height: "200vh",
          }}
          ref={lastImgRef}
        >
          <img
            src={sexy_gradient}
            style={{
              display: "inline-block",
              height: "200vh",
              width: "100vw",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BlackTextSection;
