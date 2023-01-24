import React from "react";
import Comment from "./Comment";

// The Comments component accepts a comments props and renders the Comment component once for each comment,
// using the props data
function Comments(props) {
  return (
    <section className="section" id="comment-section">
      {props.comments.map((comment, index) => {
        return <Comment key={comment.timestamp} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
