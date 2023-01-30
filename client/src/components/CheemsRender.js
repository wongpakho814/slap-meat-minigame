import React, { useEffect } from "react";
import useState from "react-usestateref";
import cheems10 from "../images/pet-animation-10.gif";
import cheemsStatic from "../images/pet-animation-static.png";

import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_TIME_PETTED } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const CheemsRender = () => {
  const [playGif, setPlayGif] = useState(false);
  const [seconds, setSeconds, secondsRef] = useState(0);
  const [ready, setReady] = useState(false);
  const { error, data } = useQuery(GET_ME);
  const [updateTimePetted] = useMutation(UPDATE_TIME_PETTED);

  // get the user's accumulated timePetted here
  useEffect(() => {
    if (data) {
      setSeconds(data.me.timePetted);
      setReady(true);
    }
  }, [data, setSeconds]);

  const startTimer = () => {
    setInterval(() => {
      setSeconds((seconds) => seconds + 1);
      updateTimePetted({ variables: { timePetted: secondsRef.current } });
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
      {Auth.loggedIn() &&
        (error ? (
          <span id="counter">
            Something went wrong when trying to connect to the Database!
          </span>
        ) : (
          ready && (
            <span id="counter">
              You have petted Cheems for {seconds}s in total! Hope it'll get
              happy soon :D
            </span>
          )
        ))}
      <div>
        <span id="press-image-span">
          Press the image to start petting Cheems!
        </span>
        <img
          alt="cheems pic"
          src={playGif ? cheems10 : cheemsStatic}
          onClick={() => onClick()}
        />
      </div>
    </>
  );
};

export default CheemsRender;
