import React from "react";
import Ably from "./Ably";
import axios from "axios";

import Auth from "../utils/auth";

function commentForm(props) {
  const addComment = async (event) => {
    event.preventDefault();

    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = event.target.elements.comment.value.trim();
    const name = event.target.elements.name.value.trim();

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
      event.target.elements.name.value = "";
      event.target.elements.comment.value = "";
    }
  };
  return (
    <div className="container">
      {Auth.loggedIn() ? (
        <>
          <h1 className="title">Please leave your feedback below</h1>
          <form onSubmit={addComment}>
            <div className="field">
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  name="comment"
                  placeholder="Add a comment"
                ></textarea>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary">Submit</button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <h1 className="title">You must login before leaving a comment!</h1>
      )}
    </div>
  );
}

export default commentForm;