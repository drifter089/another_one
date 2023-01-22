import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const AdventureMain = () => {
  const AdvTextRef = useRef();
  const mainContainer = useRef();
  const spanRefsArr = useRef(new Array());

  const once = useRef(false);

  const [text, seText] = useState("ADVENTURES..!");

  const textBlocks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < text.length; i++) {
      const tempRef = React.createRef();
      arr.push(
        <span
          style={{
            display: "inline-block",
            position: "relative",
            fontWeight: 700,
            fontSize: 700,
            // top: "60vh",
            // opacity: 0,
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

  useEffect(() => {
    if (!once.current) {
      once.current = true;
      setTimeout(() => {
        const myTimeline = gsap.timeline();

        myTimeline.to(AdvTextRef.current, {
          x: -AdvTextRef.current.scrollWidth,
          opacity: 1,
        });

        for (let i = 0; i < spanRefsArr.current.length; i++) {
          const spanRef = spanRefsArr.current.at(i);
          if (i == 0) {
            myTimeline.from(
              spanRef.current,
              {
                y: (i + 1) * i * 6 + "vh",
                // opacity: 1,
              },
              "<-35%"
            );
          } else {
            myTimeline.from(
              spanRef.current,
              {
                y: (i + 1) * i * 8 + "vh",
                opacity: 1,
              },
              "<"
            );
          }
        }

        console.log(AdvTextRef.current.scrollWidth - window.innerHeight);

        ScrollTrigger.create({
          animation: myTimeline,
          trigger: mainContainer.current,
          // markers: true,
          start: "200% 200%",
          end: "200% 0%",
          pin: mainContainer.current,
          scrub: 2,
        });
      }, 1000);
    }
  });

  return (
    <>
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
            left: "50vw",
            // opacity: 0.2,
            display: "flex",
          }}
          ref={AdvTextRef}
        >
          {textBlocks}
        </div>
      </div>
      <div className="pannelContainer">ieovjejn</div>
    </>
  );
};

export default AdventureMain;
