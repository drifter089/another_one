import React, { useEffect } from "react";
import { useNormalizedMousePosition } from "../components/normalizedMousePosHook";
import gsap from "gsap";
import { useRef } from "react";

const ContactForm = () => {
  const normalizedMousePos = useNormalizedMousePosition();

  const btn = useRef();

  useEffect(() => {
    console.log(normalizedMousePos);
    const temp = 200;
    if (normalizedMousePos.x !== NaN) {
      gsap.to(btn.current, {
        x: normalizedMousePos.x * temp,
        y: normalizedMousePos.y * temp * -1,
      });
    }
  }, [normalizedMousePos]);

  return (
    <div className="pannelContainer">
      <div
        style={{
          top: "20vh",
        }}
        className="center"
      >
        and I would like to work with you.
      </div>
      <div className="centerButton" ref={btn}>
        <span
          style={{
            display: "block",
            fontSize: "40px",
            textAlign: "center",
            paddingTop: "6vh",
          }}
        >
          Contact Me
        </span>
      </div>
    </div>
  );
};

export default ContactForm;
