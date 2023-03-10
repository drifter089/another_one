import React, { Suspense } from "react";
import BlackTextSection from "./BlackTextSection";
import TransparentText from "./TransparentText";

const GradientScroll = () => {
  return (
    <Suspense fallback={null}>
      <TransparentText />
      <div
        style={{
          height: "20vh",
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
    </Suspense>
  );
};

export default GradientScroll;
