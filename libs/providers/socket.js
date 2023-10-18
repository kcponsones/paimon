import { io } from "socket.io-client";

let BASE_URL = "";
if (process.env.PRODUCTION_TYPE == "staging") {
  BASE_URL = "http://localhost:5000/";
} else {
  BASE_URL = "https://endgame-socket.onrender.com/";
}
export const socket = io(BASE_URL);
