import { Realtime } from "ably";

console.log(
  process.env.REACT_APP_ABLY_API_KEY,
  String(process.env.REACT_APP_ABLY_API_KEY)
);
export default new Realtime(String(process.env.REACT_APP_ABLY_API_KEY));