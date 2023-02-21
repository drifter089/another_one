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

//
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FreeTime from "./FreeTime/FreeTime";
import ContactForm from "./ContactForm/ContactForm";
import Flaws from "./Flaws/Flaws";
import GradientScroll from "./GradientScroll/GradientScroll";
import BlackTextSection from "./GradientScroll/BlackTextSection";
import TransparentText from "./GradientScroll/TransparentText";
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
      {/* <Hero />
      <PixelPerfectionist /> */}
      <div
        style={{
          backgroundColor: "white",
        }}
        className="pannelContainer"
      ></div>
      <div className="pannelContainer"></div>
      <BlackTextSection />
      <div className="pannelContainer"></div>
      <div
        style={{
          backgroundColor: "white",
        }}
        className="pannelContainer"
      ></div>
      <div
        style={{
          backgroundColor: "white",
        }}
        className="pannelContainer"
      ></div>
      <div className="pannelContainer"></div>
      <TransparentText />
      <div className="pannelContainer"></div>
      <div
        style={{
          backgroundColor: "white",
        }}
        className="pannelContainer"
      ></div>
      {/* <EasterCube />
      <InteractiveLove />
      <FreeTime />
      <div
        className="pannelContainer"
        style={{
          height: "50vh",
        }}
      ></div>
      <AdventureMain />
      <ContactForm />
      <div
        className="pannelContainer"
        style={{
          height: "50vh",
        }}
      ></div>
      <Flaws /> */}
    </>
  );
}

export default App;
