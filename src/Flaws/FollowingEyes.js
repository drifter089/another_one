import React, { useState } from "react";
import { useEffect } from "react";
import useMightyMouse from "react-hook-mighty-mouse";

const FollowingEyes = () => {
  const [tiredness, setTiredness] = useState(0);

  const lp = useMightyMouse(true, "left-eye", {
    x: 45,
    y: 45,
  });

  const rp = useMightyMouse(true, "right-eye", { x: 45, y: 45 });

  useEffect(() => {}, [lp, rp]);

  const angleLeftEye = lp.selectedElement.position.angle;
  const angleRightEye = rp.selectedElement.position.angle;
  const redEye =
    (angleLeftEye < 30 || (angleLeftEye < 360 && angleLeftEye > 330)) &&
    angleRightEye > 150 &&
    angleRightEye < 210;

  const styleLeftEye = {
    transform: `rotate(${-lp.selectedElement.position.angle}deg)`,
    backgroundColor: redEye ? "#f8c6c6" : "#f3efef",
    transition: `all ${tiredness}s ease`,
  };

  const styleRightEye = {
    transform: `rotate(${-rp.selectedElement.position.angle}deg)`,
    backgroundColor: redEye ? "#f8c6c6" : "#f3efef",
    transition: `all ${tiredness}s ease`,
  };

  return (
    <div className="eyesContainer">
      <div className="container">
        <div className="eyes">
          <div id="left-eye" className="eye" style={styleLeftEye}>
            <div className="pupil" />
          </div>
          <div id="right-eye" className="eye" style={styleRightEye}>
            <div className="pupil" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingEyes;
