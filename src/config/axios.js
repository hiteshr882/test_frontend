import pureAxios from "axios";

export const axios = pureAxios.create({
  baseURL: "http://localhost:5000/",
});
