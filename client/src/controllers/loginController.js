import axios from "axios";

import config from "../config";

export const login = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${config.api_host}/api/login`, { username, password })
      .then((data) => {
        if (data && data.data) {
          resolve(data.data.token);
        }
        resolve(null);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
