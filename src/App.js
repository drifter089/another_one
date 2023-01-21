import logo from "./logo.svg";
import "./App.css";
import MainCanvas from "./KlidoScope/MainCanvas";
import SecondCanvas from "./Interactive/SecondCanvas";
import ImpossibleCube from "./FoudDimentional/ImpossibleCube";
import { Canvas } from "@react-three/fiber";
import ShaderPlane from "./ShaderPlane/ShaderPlane";
import { OrbitControls } from "@react-three/drei";
import Lobby from "./Opening/Lobby";
import PixelDance from "./PixelDance/PixelDance";
import Hero from "./Hero/Hero";
import PixelPerfectionist from "./PixelPerfectionist/PixelPerfectionist";
import InteractiveLove from "./InteractiveLove/InteractiveLove";
import EasterCube from "./EasterCube/EasterCube";
import BufferTrigs from "./Buffer2DText/BufferTrigs";

function App() {
  return (
    <>
      <Hero />
      <PixelPerfectionist />
      <EasterCube />
      <InteractiveLove />
      {/* <Lobby /> */}
      {/* <MainCanvas /> */}
      {/* <BufferTrigs /> */}
    </>
  );
}

export default App;
