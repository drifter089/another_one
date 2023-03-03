import React, { useEffect, useState, useCallback } from "react";
import { Color } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useNormalizedMousePosition } from "../components/normalizedMousePosHook";
import * as THREE from "three";

const CameraMovement = () => {
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000), 0);
    mainState.camera.position.z = 35;
  }, []);

  /**
  mouse based controls
   */
  const normalizedMousePos = useNormalizedMousePosition();

  useEffect(() => {
    const mouseX = normalizedMousePos.x;
    const mouseY = normalizedMousePos.y;

    const transitionTime = 9.5;

    const dist = 6;

    let my_x = 0;
    let my_y = 0;
    if (mouseX < 0) {
      my_x = -1 * dist;
    } else {
      my_x = dist;
    }

    if (mouseY < 0) {
      my_y = -1 * dist;
    } else {
      my_y = 1 * dist;
    }

    gsap.to(mainState.camera.position, {
      duration: transitionTime,
      x: my_x,
      y: my_y,
    });
  }, [normalizedMousePos]);

  useFrame(() => {
    mainState.camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return <></>;
};

export default CameraMovement;
