import axios from "axios";

const api = axios.create({
  baseURL: "https://omnistack7backend.herokuapp.com"
});

export default api;
