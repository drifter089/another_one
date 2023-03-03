import React from "react";
import { useAspect, useTexture, useVideoTexture } from "@react-three/drei";
import temp from "../../assets/vedios/temp.mp4";

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

const InnerCube = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <meshNormalMaterial /> */}
      {/* <meshBasicMaterial color={"pink"} /> */}
      <VideoMaterial url={temp} />
    </mesh>
  );
};

export default InnerCube;
