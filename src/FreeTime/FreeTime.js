import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";
import pic4 from "../assets/images/pic4.jpg";
import pic5 from "../assets/images/pic5.jpg";
import pic6 from "../assets/images/pic6.jpg";
gsap.registerPlugin(ScrollTrigger);

const FreeTime = () => {
  const mainContainer = useRef();

  const once = useRef(false);

  const textRef = useRef();

  const twoPicRef = useRef();
  const threePicRef = useRef();
  const fourPicRef = useRef();
  const fivePicRef = useRef();
  const sixPicRef = useRef();
  const sevenPicRef = useRef();
  const eightPicRef = useRef();
  const ninePicRef = useRef();

  useEffect(() => {
    if (!once.current) {
      once.current = true;
      setTimeout(() => {
        const myTimeline = gsap.timeline();

        myTimeline
          .from(twoPicRef.current, {
            y: "200%",
          })
          .from(
            threePicRef.current,
            {
              y: "160%",
            },
            "<"
          )
          .from(
            fourPicRef.current,
            {
              y: "120%",
            },
            "<"
          )
          .from(
            fivePicRef.current,
            {
              y: "700%",
            },
            "<"
          )
          .from(
            sixPicRef.current,
            {
              y: "169%",
            },
            "<"
          )
          .from(
            sevenPicRef.current,
            {
              y: "269%",
            },
            "<"
          )
          .from(
            eightPicRef.current,
            {
              y: "200%",
            },
            "<"
          )
          .from(
            ninePicRef.current,
            {
              y: "140%",
            },
            "<"
          )
          .from(
            textRef.current,
            {
              y: "-30%",
            },
            "<"
          );

        ScrollTrigger.create({
          animation: myTimeline,
          trigger: mainContainer.current,
          // markers: true,
          start: "0% 100%",
          end: "0% -10%",
          scrub: 1,
        });
      }, 1000);
    }
  });

  return (
    <>
      <div
        className="pannelContainer"
        style={
          {
            //   backgroundColor: "pink",
          }
        }
        ref={mainContainer}
      >
        <div
          className="center "
          style={{
            top: "-30%",
            zIndex: 3,
          }}
          ref={textRef}
        >
          And stil manage to make free time
        </div>
        <img
          style={{
            position: "absolute",
            top: "-50%",
            left: "10%",
          }}
          src={pic2}
          className="imageHorizontal"
          ref={twoPicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "10%",
            left: "0%",
          }}
          src={pic3}
          className="imageHorizontal"
          ref={threePicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "-50%",
            left: "70%",
          }}
          src={pic4}
          className="imageHorizontal"
          ref={fourPicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
          }}
          src={pic5}
          className="imageHorizontal"
          ref={fivePicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "-70%",
            left: "30%",
          }}
          src={pic6}
          className="imageHorizontal"
          ref={sixPicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "-10%",
            left: "20%",
          }}
          src={pic6}
          className="imageHorizontal"
          ref={sevenPicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "0%",
            left: "60%",
          }}
          src={pic6}
          className="imageHorizontal"
          ref={eightPicRef}
        />
        <img
          style={{
            position: "absolute",
            top: "40%",
            left: "8%",
          }}
          src={pic6}
          className="imageHorizontal"
          ref={ninePicRef}
        />
      </div>
    </>
  );
};

export default FreeTime;
