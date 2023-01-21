import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useLayoutEffect, forwardRef } from "react";

import {
  AlwaysStencilFunc,
  EqualStencilFunc,
  FrontSide,
  KeepStencilOp,
  ReplaceStencilOp,
  Color,
} from "three";

const Portal = forwardRef(function Portal(props, ref) {
  const stencilConfig = {
    stencilZPass: ReplaceStencilOp,
    stencilZFail: KeepStencilOp,
    stencilFail: KeepStencilOp,
    stencilFuncMask: 0xff,
    stencilWrite: true,
  };

  let stensilId = props.stencilId;
  const Portalsize = props.size;
  const windowPosition = props.position;
  const windowRotation = props.rotation;

  const portaPlaneMatRef = useRef();
  const childrenGroupRef = useRef();

  const mainState = useThree();

  useLayoutEffect(() => {
    /**
    modifying the plane
    */
    portaPlaneMatRef.current.side = FrontSide;
    // portaPlaneMatRef.current.colorWrite = false;
    portaPlaneMatRef.current.depthWrite = false;
    portaPlaneMatRef.current.stencilFunc = AlwaysStencilFunc;
    portaPlaneMatRef.current.stencilRef = stensilId;

    portaPlaneMatRef.current.stencilZPass = stencilConfig.stencilZPass;
    portaPlaneMatRef.current.stencilZFail = stencilConfig.stencilZFail;
    portaPlaneMatRef.current.stencilFail = stencilConfig.stencilFail;
    portaPlaneMatRef.current.stencilFuncMask = stencilConfig.stencilFuncMask;
    portaPlaneMatRef.current.stencilWrite = stencilConfig.stencilWrite;

    console.log(portaPlaneMatRef);
  });

  useEffect(() => {
    // painting background black
    mainState.gl.setClearColor(new Color(0x000000));

    /**
    modify the child objects
    */
    props.children.props.children[1].ref.current.stencilFuncMask =
      stencilConfig.stencilFuncMask;
    props.children.props.children[1].ref.current.stencilWrite =
      stencilConfig.stencilWrite;
    props.children.props.children[1].ref.current.stencilZPass =
      stencilConfig.stencilZPass;
    props.children.props.children[1].ref.current.stencilZFail =
      stencilConfig.stencilZFail;
    props.children.props.children[1].ref.current.stencilFail =
      stencilConfig.stencilFail;
    //
    props.children.props.children[1].ref.current.stencilFunc = EqualStencilFunc;
    props.children.props.children[1].ref.current.stencilRef = stensilId;

    // modify group property
    childrenGroupRef.current.renderOrder = stensilId;

    // material of only child
    console.log(props.children.props.children[1].ref.current);
  });

  return (
    <>
      {/* objects modified to be only visible through WINDOW plane  */}
      <group ref={childrenGroupRef}>{props.children}</group>
      {/* WINDOW to the world */}
      <mesh position={windowPosition} rotation={windowRotation}>
        <planeGeometry args={[Portalsize, Portalsize]} />
        <meshBasicMaterial color={"black"} ref={portaPlaneMatRef} />
      </mesh>
    </>
  );
});

export default Portal;
