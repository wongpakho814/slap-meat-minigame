import React, { useEffect } from "react";
import Ably from "./Ably";
import axios from "axios";

import Auth from "../utils/auth";

const CommentForm = (props) => {
  const addComment = async (event) => {
    event.preventDefault();
    
    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = document.getElementById("comment-text").value.trim();
    const name = Auth.getProfile().data.username;

    // Get the current time.
    const timestamp = Date.now();

    // Retrieve a random image from the Dog API
    const avatar = await (
      await axios.get("https://dog.ceo/api/breeds/image/random")
    ).data.message;

    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment, timestamp, avatar };

      // Publish comment
      const channel = Ably.channels.get("comments");
      channel.publish("add_comment", commentObject, (err) => {
        if (err) {
          console.log("Unable to publish message err = " + err.message);
        }
      });

      // Clear input fields
      document.getElementById("comment-text").value = "";
    }
  };

  // Submit the comment when the Enter key is pressed
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        addComment(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  
  return (
    <div className="container" id="comment-form-container">
      {Auth.loggedIn() ? (
        <>
          <form className="comment-form" onSubmit={addComment}>
            <div className="field" id="comment-box">
              <div className="control">
                <textarea
                  className="textarea"
                  id="comment-text"
                  name="comment"
                  placeholder="Add a comment here"
                ></textarea>
              </div>
            </div>
            <div className="field" id="submit-comment">
              <button className="button is-primary" type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <h1 className="title login-error">
          You must login before leaving a comment!
        </h1>
      )}
    </div>
  );
};

export default CommentForm;
