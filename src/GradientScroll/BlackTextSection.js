import React, { useLayoutEffect, useRef, useState } from "react";
import sexy_gradient from "../assets/images/sexy_gradient.png";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
          start: "100% 300%",
          end: "100% 0%",
          scrub: 2,
          markers: true,
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
    <div style={{ position: "relative" }}>
      {hideText ? (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: 3,
            color: "black",
            backgroundColor: "pink",
            opacity: 0.2,
            height: "100vh",
            width: "100vw",
          }}
        >
          sfasffv
        </div>
      ) : (
        <></>
      )}
      <div className="pannelContainer">
        <img src={sexy_gradient} className="pannelContainer" />
      </div>
      <div className="pannelContainer">
        <img
          src={sexy_gradient}
          className="pannelContainer rotate"
          ref={lastImgRef}
        />
      </div>
    </div>
  );
};

export default BlackTextSection;
