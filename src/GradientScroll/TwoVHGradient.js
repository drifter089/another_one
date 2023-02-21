import React, { useLayoutEffect, useRef, useState } from "react";
import sexy_gradient from "../assets/images/sexy_gradient.png";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TwoVHGradient = (componentToBeMounted) => {
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

  return <></>;
};

export default TwoVHGradient;
