import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Color } from "three";
import { degToRad } from "three/src/math/MathUtils";

import OuterCube from "./OuterCubes/OuterCube";
import InnerCube from "./InnerCube";

import ved1 from "../../assets/vedios/watchingCat.mp4";
import ved2 from "../../assets/vedios/sleepCode.mp4";
import ved3 from "../../assets/vedios/office.mp4";
import ved4 from "../../assets/vedios/lastminute.mp4";
import ved5 from "../../assets/vedios/competitive.mp4";
import ved6 from "../../assets/vedios/afternoon.mp4";

import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";

const radius = 13;
const theta = 60;

const ClickyCubes = ({ selected, setSelected }) => {
  const groupRefArr = useMemo(
    () => Array.from({ length: 6 }, () => React.createRef()),
    []
  );

  const rotationTimelineArr = useMemo(
    () => Array.from({ length: 6 }, () => new Timeline()),
    []
  );

  const mountTimelineArr = useMemo(
    () => Array.from({ length: 6 }, () => new Timeline({ paused: true })),
    []
  );

  const vedioArr = useMemo(() => [ved1, ved2, ved3, ved4, ved5, ved6], []);

  const groupedCubes = useMemo(() => {
    return groupRefArr.map((ref, index) => {
      return (
        <OuterCube
          innerCube={InnerCube}
          setSelected={setSelected}
          index={index}
          key={index}
          ref={ref}
          data={vedioArr[index]}
        />
      );
    });
  }, [groupRefArr, setSelected, vedioArr]);

  const mainState = useThree();

  useLayoutEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000), 0);

    // ponytail: rAF poll until cube refs are mounted (video textures can
    // suspend the subtree) — replaces the old setTimeout(3000) guess
    let frame;
    const init = () => {
      const ready = groupRefArr.every(
        (ref) =>
          ref.current &&
          ref.current.children[0]?.material?.uniforms?.shaderOpacityRef
      );
      if (!ready) {
        frame = requestAnimationFrame(init);
        return;
      }

      groupRefArr.forEach((ref, i) => {
        // move to position on the circle
        const angle = i * theta;
        const x = radius * Math.cos(degToRad(angle));
        const y = radius * Math.sin(degToRad(angle));
        gsap.to(ref.current.position, { x: x, y: y });

        // idle rotation
        rotationTimelineArr[i].to(ref.current.rotation, {
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          duration: 5,
          x: Math.random() * 12 * (i / 4),
          y: Math.random() * 10 * (i / 4),
          z: Math.random() * 13.2,
        });

        // mount / unmount (fly to center) tweens
        mountTimelineArr[i]
          .to(ref.current.position, {
            x: 0,
            y: -0.5,
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
      });
    };
    init();

    return () => {
      cancelAnimationFrame(frame);
      groupRefArr.forEach((ref) => {
        if (ref.current) {
          gsap.killTweensOf(ref.current.position);
          gsap.killTweensOf(ref.current.rotation);
        }
      });
      rotationTimelineArr.forEach((timeline) => timeline.clear());
      mountTimelineArr.forEach((timeline) => timeline.clear());
    };
  }, [groupRefArr, rotationTimelineArr, mountTimelineArr, mainState.gl]);

  useEffect(() => {
    if (selected !== -1) {
      mountTimelineArr[selected].play();
    }

    return () => {
      if (selected !== -1) {
        mountTimelineArr[selected].reverse();
      }
    };
  }, [selected, mountTimelineArr]);

  return <>{groupedCubes}</>;
};

export default ClickyCubes;
