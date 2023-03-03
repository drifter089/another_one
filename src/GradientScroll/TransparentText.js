import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TransparentText = () => {
  const once = useRef(false);

  const lastImgRef = useRef();

  const textBackgroundRef = useRef();

  const [hideText, setHideText] = useState(false);

  useEffect(() => {
    if (hideText) {
      textBackgroundRef.current.classList.remove("unmount");
    } else {
      textBackgroundRef.current.classList.add("unmount");
    }
  }, [hideText]);

  useEffect(() => {
    if (!once.current) {
      once.current = true;

      const myTemp = gsap.timeline();

      setTimeout(() => {
        myTemp.to(textBackgroundRef.current, {
          backgroundPosition: "0 -160vh",
        });

        ScrollTrigger.create({
          animation: myTemp,
          trigger: lastImgRef.current,
          start: "0% 80%",
          end: "100% 50%",
          scrub: 2,
          // markers: true,
          onEnter: () => {
            setHideText(true);
          },
          onLeave: () => {
            setHideText(false);
          },
          onEnterBack: () => {
            setHideText(true);
          },
          onLeaveBack: () => {
            setHideText(false);
          },
        });
      }, 500);
    }
  }, []);

  return (
    <>
      <div
        className="transtext"
        ref={lastImgRef}
        style={{
          opacity: 0,
        }}
      ></div>
      <div className="grandchild unmount" ref={textBackgroundRef}>
        with animation skills to boot and attention to detail.
      </div>
    </>
  );
};

export default TransparentText;
