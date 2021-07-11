import axios from "axios";

export const origin = "http://localhost:3000";
export default axios.create({
  baseURL: "http://backend.com",
});