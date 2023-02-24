import React from "react";
import BlackTextSection from "./BlackTextSection";
import TransparentText from "./TransparentText";

const GradientScroll = () => {
  return (
    <>
      <TransparentText />
      <div
        style={{
          height: "80vh",
        }}
        className="pannelContainer"
      ></div>
      <BlackTextSection />
      <div
        style={{
          height: "80vh",
        }}
        className="pannelContainer"
      ></div>
    </>
  );
};

export default GradientScroll;
