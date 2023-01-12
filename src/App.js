import logo from "./logo.svg";
import "./App.css";
import MainCanvas from "./Hero/MainCanvas";
import SecondCanvas from "./Interactive/SecondCanvas";
import ImpossibleCube from "./FoudDimentional/ImpossibleCube";
import { Canvas } from "@react-three/fiber";
import ShaderPlane from "./ShaderPlane/ShaderPlane";
import { OrbitControls } from "@react-three/drei";
import Lobby from "./Opening/Lobby";
import PixelDance from "./PixelDance/PixelDance";

function App() {
  return (
    <>
      <PixelDance />
      {/* <Lobby /> */}
      {/* <MainCanvas />
      <SecondCanvas /> */}
      {/* <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        shadows
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 50 }}
      >
        <ImpossibleCube />
        {/* tweak   */}
      {/* <ShaderPlane /> 
        <OrbitControls />
      </Canvas> */}
    </>
  );
}

export default App;
