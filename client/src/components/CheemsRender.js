import React, { useState } from "react";
import cheems10 from "../images/pet-animation-10.gif";
import cheemsStatic from "../images/pet-animation-static.png";

function CheemsRender() {
  const [playGif, setPlayGif] = useState(false);
  return (
    <div>
      <span>Press the image to start petting Cheems!</span>
      <img
        alt="cheems pic"
        src={playGif ? cheems10 : cheemsStatic}
        onClick={() => setPlayGif((prevMode) => true)}
      />
    </div>
  );
}

export default CheemsRender;
