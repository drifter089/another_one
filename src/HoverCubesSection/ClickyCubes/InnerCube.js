import React from "react";
import { useVideoTexture } from "@react-three/drei";

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

const InnerCube = ({ data }) => {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      {/* <meshNormalMaterial /> */}
      {/* <meshBasicMaterial color={"pink"} /> */}
      <VideoMaterial url={data} />
    </mesh>
  );
};

export default InnerCube;
