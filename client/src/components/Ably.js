import { Realtime } from "ably";

export default new Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });