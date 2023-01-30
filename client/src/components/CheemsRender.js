import React, { useState } from "react";
import cheems10 from "../images/pet-animation-10.gif";
import cheemsStatic from "../images/pet-animation-static.png";

function CheemsRender() {
  const [playGif, setPlayGif] = useState(false);
  const [seconds, setSeconds] = useState(0);  

  const startTimer = () => {
    setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  };

  const onClick = () => {
    if (playGif === false) {
      startTimer();
      document.querySelector("#press-image-span").remove();
    }
    setPlayGif(true);
  };
  return (
    <>
      <span id="counter">You have petted Cheems for {seconds}s in total! Hope it'll get happy soon :D</span>
      <div>
        <span id="press-image-span">Press the image to start petting Cheems!</span>
        <img
          alt="cheems pic"
          src={playGif ? cheems10 : cheemsStatic}
          onClick={() => onClick()}
        />
      </div>
    </>
  );
}

export default CheemsRender;
