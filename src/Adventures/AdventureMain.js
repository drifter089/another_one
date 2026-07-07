import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const text = "ADVENTURES..!";

const AdventureMain = () => {
  const AdvTextRef = useRef();
  const mainContainer = useRef();
  const spanRefsArr = useRef([]);

  const textBlocks = useMemo(() => {
    const arr = [];
    spanRefsArr.current = [];
    for (let i = 0; i < text.length; i++) {
      const tempRef = React.createRef();
      arr.push(
        <span
          style={{
            display: "inline-block",
            position: "relative",
            fontWeight: 700,
            fontSize: "13vw",
          }}
          ref={tempRef}
          key={i}
        >
          {text.charAt(i)}
        </span>
      );
      spanRefsArr.current.push(tempRef);
    }
    return arr;
  }, []);

  useLayoutEffect(() => {
    const myTimeline = gsap.timeline();

    myTimeline
      .to(AdvTextRef.current, {
        opacity: 1,
      })
      .to(AdvTextRef.current, {
        x: -AdvTextRef.current.scrollWidth - 100,
      });

    for (let i = 0; i < spanRefsArr.current.length; i++) {
      const spanRef = spanRefsArr.current.at(i);
      if (i === 0) {
        myTimeline.from(
          spanRef.current,
          {
            y: (i + 1) * i * 6 + "vh",
          },
          "<-28%"
        );
      } else {
        myTimeline.from(
          spanRef.current,
          {
            y: (i + 1) * i * 10 + "vh",
            opacity: 1,
          },
          "<"
        );
      }
    }

    const trigger = ScrollTrigger.create({
      animation: myTimeline,
      trigger: mainContainer.current,
      start: "0% 0%",
      end: "200% 0%",
      pin: mainContainer.current,
      scrub: 1,
    });

    return () => {
      trigger.kill();
      myTimeline.kill();
    };
  }, []);

  return (
    <div className="pannelContainer" ref={mainContainer}>
      <div
        className="center"
        style={{
          top: "10%",
        }}
      >
        I am up for new
      </div>
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "100vw",
          opacity: 0,
          display: "flex",
        }}
        ref={AdvTextRef}
      >
        {textBlocks}
      </div>
    </div>
  );
};

export default AdventureMain;
