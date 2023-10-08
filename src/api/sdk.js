import axios from "axios";

export const instance = axios.create({
  baseURL: "https://wlp.howizbiz.com/",
  //timeout: 6000,
});
