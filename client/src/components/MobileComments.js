import React from "react";
import Comment from "./Comment";

function MobileComments(props) {
  return (
    <section className="section" id="mobile-comment-section">
      {props.comments.map((comment, index) => {
        return <Comment key={comment.timestamp} comment={comment} />;
      })}
    </section>
  );
}

export default MobileComments;
