import React from "react";

const messageDateGet = (props) => {
  const date = new Date(props.comment.timestamp);
  const dateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const localeString = date.toLocaleString(undefined, dateTimeFormatOptions);
  return localeString;
};

const Comment = (props) => {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <img alt="dog pic" src={props.comment.avatar} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <span className="user-name">{props.comment.name} </span>
            <span className="message-date">{messageDateGet(props)}</span>
            <p>{props.comment.comment}</p>
          </div>
        </div>
      </article>
    );
}

export default Comment;
