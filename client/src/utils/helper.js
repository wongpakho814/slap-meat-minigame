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