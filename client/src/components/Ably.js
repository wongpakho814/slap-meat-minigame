import { Realtime } from "ably";


export default new Realtime(String(process.env.REACT_APP_ABLY_API_KEY));