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
import SectionNav from "./components/SectionNav";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      <Logo3D />
      <SectionNav />
      <div className="navSection">
        <ZeroGBox />
      </div>
      <div className="navSection">
        <PixelPerfectionist />
      </div>
      <div className="navSection">
        <GradientScroll />
      </div>
      <div className="navSection">
        <EasterCube />
      </div>
      <div className="navSection">
        <InteractiveLove />
      </div>
      <div className="navSection">
        <ImageHelixScroller />
      </div>
      <div className="navSection">
        <AdventureMain />
      </div>
      <div className="navSection">
        <MainStage />
      </div>
      <div
        className="pannelContainer"
        style={{
          height: "40vh",
        }}
      ></div>
      <div className="navSection">
        <ContactForm />
      </div>
    </>
  );
}

export default App;
