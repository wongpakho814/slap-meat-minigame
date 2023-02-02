import { Realtime } from "ably";

export default new Realtime({ keyOrToken: process.env.REACT_APP_ABLY_API_KEY });