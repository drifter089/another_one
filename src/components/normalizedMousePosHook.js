import { useState, useEffect } from "react";

export function useNormalizedMousePosition() {
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    const x = (clientX / innerWidth) * 2 - 1;
    const y = -(clientY / innerHeight) * 2 + 1;

    setNormalizedPosition({ x, y });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("scroll", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("scroll", handleMouseMove);
    };
  }, []);

  return normalizedPosition;
}
