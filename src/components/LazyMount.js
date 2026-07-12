import React, { useEffect, useRef, useState } from "react";

// Mounts children only while the wrapper is within 1.5 screens of the
// viewport. WebGL canvases release their context when far off-screen
// (browsers cap ~8-16 live contexts and silently kill the oldest one)
// and are recreated a full screen before they scroll back into view.
const LazyMount = ({ children }) => {
  const holderRef = useRef();
  const [near, setNear] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "150% 0px 150% 0px" }
    );
    observer.observe(holderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holderRef} style={{ width: "100%", height: "100%" }}>
      {near && children}
    </div>
  );
};

export default LazyMount;
