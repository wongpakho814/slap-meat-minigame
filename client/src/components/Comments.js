import React from "react";
import Comment from "./Comment";

// The Comments component accepts a comments props and renders the Comment component once for each comment, 
// using the props data
function Comments(props) {
  let comments = [];
  return (
    <section className="section" id="comment-section">
      {props.comments.map((comment, index) => {
        comments.push(comment.timestamp);
        // Remove the rendered comments from the DOM if more than 5 comments are rendered already
        if (comments.length > 4) {
            document.getElementById(comments[0]).remove();
            comments.shift();
        }
        return <Comment key={comment.timestamp} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
