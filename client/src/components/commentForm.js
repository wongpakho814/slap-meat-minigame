import React from "react";
import Ably from "./Ably";

function commentForm(props) {
  const addComment = (event) => {
    event.preventDefault();

    // Get the value of the comment box
    // and make sure it not some empty strings
    const comment = event.target.elements.comment.value.trim();
    const name = event.target.elements.name.value.trim();

    // Get the current time.
    const timestamp = Date.now();
    // Make sure name and comment boxes are filled
    if (name && comment) {
      const commentObject = { name, comment, timestamp };
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
    </div>
  );
}

export default commentForm;
