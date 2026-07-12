import "./App.css";

import PixelPerfectionist from "./PixelPerfectionist/PixelPerfectionist";
import InteractiveLove from "./InteractiveLove/InteractiveLove";
import EasterCube from "./EasterCube/EasterCube";
import AdventureMain from "./Adventures/AdventureMain";
import ContactForm from "./ContactForm/ContactForm";
import GradientScroll from "./GradientScroll/GradientScroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ImageHelixScroller from "./ImageHelixScroller/ImageHelixScroller";
import ZeroGBox from "./ZeroGravityPhysics/ZeroGBox";
import MainStage from "./HoverCubesSection/MainStage";
import Logo3D from "./components/Logo3D";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      <Logo3D />
      <ZeroGBox />
      <PixelPerfectionist />
      <GradientScroll />
      <EasterCube />
      <InteractiveLove />
      <ImageHelixScroller />
      <AdventureMain />
      <MainStage />
      <div
        className="pannelContainer"
        style={{
          height: "40vh",
        }}
      ></div>
      <ContactForm />
    </>
  );
}

export default App;
