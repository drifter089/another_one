import logo from "./logo.svg";
import "./App.css";

import { useEffect, useRef } from "react";
//
import Lobby from "./Opening/Lobby";
import BufferTrigs from "./Buffer2DText/BufferTrigs";
//
import Hero from "./Hero/Hero";
import PixelPerfectionist from "./PixelPerfectionist/PixelPerfectionist";
import InteractiveLove from "./InteractiveLove/InteractiveLove";
import EasterCube from "./EasterCube/EasterCube";
import AdventureMain from "./Adventures/AdventureMain";
import FreeTime from "./FreeTime/FreeTime";
import ContactForm from "./ContactForm/ContactForm";
import Flaws from "./Flaws/Flaws";
import GradientScroll from "./GradientScroll/GradientScroll";

//
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ImageHelixScroller from "./ImageHelixScroller/ImageHelixScroller";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const once = useRef(false);

  useEffect(() => {
    if (!once.current) {
      once.current = true;
      setTimeout(() => {
        const myTimeline = gsap.timeline();

        // ScrollTrigger.create({
        //   animation: myTimeline,
        //   trigger: mainContainer.current,
        //   markers: true,
        //   start: "200% 200%",
        //   end: "200% 0%",
        //   pin: mainContainer.current,
        //   scrub: 2,
        // });
      }, 1000);
    }
  });

  return (
    <>
      {/* <Hero /> */}
      <ZeroGBox />
      <PixelPerfectionist />
      <GradientScroll />
      <EasterCube />
      <InteractiveLove />
      <div
        className="pannelContainer"
        style={{
          height: "50vh",
        }}
      ></div>
      <ImageHelixScroller />
      <AdventureMain />
      {/* <MainStage /> */}
      {/* {/* <ContactForm /> */}
      {/* <div
      className="pannelContainer"
      style={{
        height: "50vh",
      }}
      ></div>
      <Flaws />
      <FreeTime />  */}
    </>
  );
}

export default App;
