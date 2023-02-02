import React, { useEffect, useCallback } from "react";
import useState from "react-usestateref";
import cheems10 from "../images/pet-animation-10.gif";
import cheems30 from "../images/pet-animation-30.gif";
import cheems50 from "../images/pet-animation-50.gif";
import cheemsStatic from "../images/pet-animation-static.png";

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_TIME_PETTED } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const CheemsRender = () => {
  const [playGif, setPlayGif] = useState(false);
  const [seconds, setSeconds, secondsRef] = useState(0);
  const [ready, setReady] = useState(false);
  const [imgSrc, setImgSrc] = useState(cheems10);
  const { error, data } = useQuery(GET_ME);
  const [updateTimePetted] = useMutation(UPDATE_TIME_PETTED);

  // Function to animate the timer on render
  const incNbrRec = useCallback(
    (i, endNbr) => {
      let speed;
      switch (endNbr) {
        case endNbr < 100:
          speed = 25;
          break;
        case endNbr > 100 && endNbr < 1000:
          speed = 10;
          break;
        default:
          speed = 1;
      }

      if (i <= endNbr && !ready) {
        setSeconds(i);
        setTimeout(function () {
          incNbrRec(i + 1, endNbr);
        }, speed);
      }
    },
    [ready, setSeconds]
  );

  // Function to change the height of multiple divs when user is logged in
  useEffect(() => {
    if (Auth.loggedIn()) {
      const newHeight = "calc(100vh - 166px)";
      document.querySelector("#table-div").style.height = newHeight;
      document.querySelector("#main-div").style.height = newHeight;
      document.querySelector("#cheems-area-section div").style.height = newHeight;
    }
  });

  // get the user's accumulated timePetted here
  useEffect(() => {
    if (data) {
      incNbrRec(0, data.me.timePetted);
      setReady(true);
    }
  }, [data, incNbrRec]);

  const startTimer = () => {
    if (Auth.loggedIn()) {
      setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        updateTimePetted({ variables: { timePetted: secondsRef.current } });
      }, 1000);
    }
  };

  const handleOnChange = (event) => {
    switch (event.target.value) {
      case "normal":
        setImgSrc(cheems10);
        break;
      case "fast":
        setImgSrc(cheems30);
        break;
      case "very-fast":
        setImgSrc(cheems50);
        break;
      default:
        setImgSrc(cheems10);
    }
  };

  const handleOnClick = (event) => {
    if (playGif === false) {
      startTimer();
      document.querySelector("#press-image-span").remove();
    }
    setPlayGif(true);
  };

  return (
    <>
      {Auth.loggedIn() &&
        (error ? (
          <span id="counter">
            Something went wrong when trying to connect to the Database!
          </span>
        ) : (
          ready && (
            <span id="counter">
              You have petted Cheems for{" "}
              <span id="counter-span">{seconds}s</span> in total! <br /> Hope it'll get
              happy soon :D
              <br />
              <select name="speed" id="speed" onChange={handleOnChange}>
                <option value="normal">Normal</option>
                <option value="fast">Kinda fast</option>
                <option value="very-fast">WOOOOOOOO</option>
              </select>
            </span>
          )
        ))}
      <div>
        <span id="press-image-span">
          Press the image to start petting Cheems!
        </span>
        <img
          id="cheems-pic"
          alt="cheems pic"
          src={playGif ? imgSrc : cheemsStatic}
          onClick={() => handleOnClick()}
        />
      </div>
    </>
  );
};

export default CheemsRender;
