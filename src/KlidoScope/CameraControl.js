import React, { useEffect, useState, useCallback } from "react";
import { Color } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useNormalizedMousePosition } from "../components/normalizedMousePosHook";
import * as THREE from "three";

const CameraControl = () => {
  // used in useEffect below to paint canvas black
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000));
    mainState.camera.position.z = 25;
  }, []);

  /**
  mouse based controls
   */
  const normalizedMousePos = useNormalizedMousePosition();

  function cameraTl() {
    const mouseX = normalizedMousePos.x;
    const mouseY = normalizedMousePos.y;

    const transitionTime = 1.5;

    const dist = 16;

    gsap.to(mainState.camera.position, {
      duration: transitionTime,
      x: dist * mouseX,
      y: dist * mouseY,
    });
  }

  useEffect(() => {
    cameraTl();
  }, [normalizedMousePos]);

  useFrame(() => {
    mainState.camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  /**
   * random positon
   */
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount(count + 1);
  //     animation();
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [count]);

  // // make this common
  // function getRandomNumBetween(x, y) {
  //   let v = 1;
  //   const r = Math.random();
  //   if (r < 0.5) {
  //     v = -1;
  //   }
  //   return (Math.random() * (y - x) + x) * v;
  // }

  // const animation = useCallback(() => {
  //   const dist = { min: 16, max: 20 };
  //   const x = getRandomNumBetween(dist.min, dist.max);
  //   const y = getRandomNumBetween(dist.min, dist.max);
  //   const z = getRandomNumBetween(dist.min, dist.max);
  //   gsap.to(mainState.camera.position, { duration: 2, x: x, y: y, z: z });
  // }, []);

  return <></>;
};

export default CameraControl;
