import React from "react";

// Mobile-only floating button that jumps to the next top-level section.
// Some sections capture touch (OrbitControls drag) or need many screens
// of scrolling, so on phones this is the reliable way through the page.
// Loops back to the top after the last section.
const SectionNav = () => {
  const next = () => {
    const sections = Array.from(document.querySelectorAll(".navSection"));
    const target = sections.find((s) => s.offsetTop > window.scrollY + 10);
    window.scrollTo({
      top: target ? target.offsetTop : 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="sectionNav" onClick={next}>
      &#8595;
    </div>
  );
};

export default SectionNav;
