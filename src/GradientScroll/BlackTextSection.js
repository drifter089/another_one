import React, { useLayoutEffect, useRef, useEffect, useState } from "react";

import sexy_gradient from "../assets/images/combined_gradient.png";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BlackTextSection = () => {
  const once = useRef(false);

  const lastImgRef = useRef();
  const overlayTextRef = useRef();
  const overlayTextSpanRef = useRef();

  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    if (hideText) {
      overlayTextRef.current.classList.remove("unmount");
      overlayTextSpanRef.current.classList.remove("unmount");
    } else {
      overlayTextRef.current.classList.add("unmount");
      overlayTextSpanRef.current.classList.add("unmount");
    }
  }, [hideText]);

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      setTimeout(() => {
        ScrollTrigger.create({
          // animation: myTemp,
          trigger: lastImgRef.current,

          start: "0% 50%",
          end: "100% 50%",
          scrub: 2,
          markers: true,
          onEnter: () => {
            setHideText(true);
            // console.log("enter");
          },
          onLeave: () => {
            setHideText(false);
            // console.log("left");
          },
          onEnterBack: () => {
            setHideText(true);
            // console.log("enterback");
          },
          onLeaveBack: () => {
            setHideText(false);
            // console.log("leaveback");
          },
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="pannelContainer"></div>
      <div style={{ position: "relative" }}>
        <>
          <div
            style={{
              textAlign: "center",
            }}
            className="unmount mount"
            ref={overlayTextRef}
          >
            <span
              style={{
                color: "black",
                position: "relative",
                display: "block",
                top: "40%",
              }}
              className="unmount"
              ref={overlayTextSpanRef}
            >
              I can bring your ideas to life.
            </span>
          </div>
        </>
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
