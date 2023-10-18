import axios from "axios";

let BASE_URL = '';
if(process.env.PRODUCTION_TYPE == 'staging'){
   BASE_URL = "http://localhost:3000/api";
}
else{
  BASE_URL = "https://endgame-v2.vercel.app/api";
}


export const api = axios.create({
  baseURL: BASE_URL,
});
