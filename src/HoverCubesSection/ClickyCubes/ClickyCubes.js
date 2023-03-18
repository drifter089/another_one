import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AxesHelper, Vector3, DoubleSide, Color } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";

import OuterCube from "./OuterCubes/OuterCube";
import InnerCube from "./InnerCube";

import ved1 from "../../assets/vedios/watchingCat.mp4";
import ved2 from "../../assets/vedios/sleepCode.mp4";
import ved3 from "../../assets/vedios/office.mp4";
import ved4 from "../../assets/vedios/lastminute.mp4";
import ved5 from "../../assets/vedios/competitive.mp4";
import ved6 from "../../assets/vedios/afternoon.mp4";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Timeline } from "gsap/gsap-core";
gsap.registerPlugin(ScrollTrigger);

const GroupedAnimationCubes = React.forwardRef(
  ({ setSelected, index, data }, ref) => {
    const groupRef = useRef();

    useFrame(() => {
      groupRef.current.rotation.x = ref.current.rotation.x;
      groupRef.current.rotation.y = ref.current.rotation.y;
      groupRef.current.rotation.z = ref.current.rotation.z;
      groupRef.current.position.x = ref.current.position.x;
      groupRef.current.position.y = ref.current.position.y;
      groupRef.current.position.z = ref.current.position.z;
      groupRef.current.children[0].material.uniforms.shaderOpacityRef.value =
        ref.current.shaderOpacity;
    });

    return (
      <>
        <group position={[0, -12, 0]} ref={groupRef} key={index}>
          <OuterCube setSelected={setSelected} index={index} key={index} />
          <InnerCube data={data} />
        </group>
      </>
    );
  }
);

const ClickyCubes = ({ selected, setSelected }) => {
  /**
   * creting refs
   */

  const groupRef0 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });
  const groupRef1 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });
  const groupRef2 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });
  const groupRef3 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });
  const groupRef4 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });
  const groupRef5 = useRef({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    shaderOpacity: 0.7,
  });

  const groupRefArr = useMemo(
    () => [groupRef0, groupRef1, groupRef2, groupRef3, groupRef4, groupRef5],
    []
  );

  /**
   * creating timelines
   */

  // rotation
  const Rotation1 = new Timeline();
  const Rotation2 = new Timeline();
  const Rotation3 = new Timeline();
  const Rotation4 = new Timeline();
  const Rotation5 = new Timeline();
  const Rotation6 = new Timeline();

  const rotationTimelineArr = useMemo(
    () => [Rotation1, Rotation2, Rotation3, Rotation4, Rotation5, Rotation6],
    []
  );

  // mount
  const m1 = new Timeline({ paused: true });
  const m2 = new Timeline({ paused: true });
  const m3 = new Timeline({ paused: true });
  const m4 = new Timeline({ paused: true });
  const m5 = new Timeline({ paused: true });
  const m6 = new Timeline({ paused: true });

  const mountTimelineArr = useMemo(() => [m1, m2, m3, m4, m5, m6], []);

  const radius = 13;
  const theta = 60;

  /**
   * cubes initial mount
   */

  const mainState = useThree();

  const once = useRef(false);

  function makeRotationTweens(timeline, ref, i) {
    const TimeR = 5;
    const x = Math.random() * 12 * (i / 4);
    const y = Math.random() * 10 * (i / 4);
    const z = Math.random() * 13.2;

    timeline.to(ref.current.rotation, {
      repeat: -1,
      yoyo: true,
      yoyoEase: true,
      duration: TimeR,
      x: x,
      y: y,
      z: z,
    });
  }

  function makeMountTweens(timeline, ref) {
    timeline
      .to(ref.current.position, {
        x: 0,
        y: -0.5,
        z: 14,
        duration: 1.5,
      })
      .to(
        ref.current,
        {
          shaderOpacity: 0,
          duration: 1.5,
        },
        "<"
      );
  }

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;
      groupRefArr.map((ref, i) => {
        // calculate position
        const angle = i * theta;
        let x = radius * Math.cos(degToRad(angle));
        let y = radius * Math.sin(degToRad(angle));

        // moving to position
        gsap.to(ref.current.position, {
          x: x,
          y: y,
        });

        // creating tweens for mount and unmount
        makeRotationTweens(rotationTimelineArr[i], ref, i);
        makeMountTweens(mountTimelineArr[i], ref);
      });
    }
    mainState.gl.setClearColor(new Color(0x000000), 0);
  }, []);

  /**
   state based animations
  */

  useEffect(() => {
    if (selected != -1) {
      // come up
      mountTimelineArr[selected].play();
    }

    return () => {
      if (selected != -1) {
        // go back
        mountTimelineArr[selected].reverse();
      }
    };
  }, [selected]);

  return (
    <>
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={0}
        key={0}
        data={ved1}
        ref={groupRef0}
      />
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={1}
        key={1}
        data={ved2}
        ref={groupRef1}
      />
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={2}
        key={2}
        data={ved3}
        ref={groupRef2}
      />
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={3}
        key={3}
        data={ved4}
        ref={groupRef3}
      />
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={4}
        key={4}
        data={ved5}
        ref={groupRef4}
      />
      <GroupedAnimationCubes
        setSelected={setSelected}
        index={5}
        key={5}
        data={ved6}
        ref={groupRef5}
      />
    </>
  );
};

export default ClickyCubes;
