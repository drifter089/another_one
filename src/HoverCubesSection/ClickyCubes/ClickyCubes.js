import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AxesHelper, Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";

import OuterCube from "./OuterCubes/OuterCube";
import InnerCube from "./InnerCube";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Timeline } from "gsap/gsap-core";
gsap.registerPlugin(ScrollTrigger);

const ClickyCubes = (props) => {
  const [selected, setSelected] = useState(-1);
  // const [inTransition, setInTransition] = useState(false);

  /**
   * creting refs
   */

  const groupRef0 = React.createRef();
  const groupRef1 = React.createRef();
  const groupRef2 = React.createRef();
  const groupRef3 = React.createRef();
  const groupRef4 = React.createRef();
  const groupRef5 = React.createRef();

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

  /**
   * Generating Cubes
   */

  const radius = 10;
  const theta = 60;

  const groupedCubes = useMemo(() => {
    const result = groupRefArr.map((ref, index) => {
      return (
        <OuterCube
          innerCube={InnerCube}
          setSelected={setSelected}
          index={index}
          key={index}
          ref={ref}
        />
      );
    });

    return result;
  }, [radius]);

  /**
   * cubes initial mount
   */

  const state = useThree();

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
        y: 0,
        z: 14,
        duration: 1.5,
      })
      .to(
        ref.current.children[0].material.uniforms.shaderOpacityRef,
        {
          value: 0,
          duration: 1.5,
        },
        "<"
      );
  }

  useLayoutEffect(() => {
    if (!once.current) {
      setTimeout(() => {
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
      }, 100);
    }
  }, []);

  /**
   state based animations
  */

  function setHtml(x) {
    props.setSelectedHTML(x);
  }

  useEffect(() => {
    if (selected != -1) {
      // come up
      mountTimelineArr[selected].play();
      // console.log("played");
      console.log(groupRefArr[selected]);
    }
    // setHtml(selected);

    return () => {
      if (selected != -1) {
        // go back
        mountTimelineArr[selected].reverse();
        // setSelectedHTML(() => {
        //   return selected;
        // });
      }
      // setHtml(selected);
      // props.setSelectedHTML(selected);
    };
  }, [selected]);

  return <>{groupedCubes}</>;
};

export default React.memo(ClickyCubes);
