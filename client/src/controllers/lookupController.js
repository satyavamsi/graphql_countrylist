import axios from "axios";

import config from "../config";

export const getCountries = async (token, name) => {
  // Query for fetching countries
  const query = JSON.stringify({
    query: `{
          countries(name: "${name}") {
              name
              population
              numericCode
              currencies {
                  code
                  name
                  symbol
              }
          }
      }`,
    variables: {},
  });

  return new Promise((resolve, reject) => {
    // Axios config with access token and body
    const req_config = {
      method: "post",
      url: `${config.api_host}/api/graphql`,
      headers: {
        "X-ACCESS-TOKEN": token,
        "Content-Type": "application/json",
      },
      data: query,
    };

    axios(req_config)
      .then((data) => {
        if (data?.data?.data?.countries) {
          resolve(data.data.data.countries);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};

export const getConversion = async (token) => {
  // Query for fetching conversions
  const query = JSON.stringify({
    query: `{
          conversion
      }`,
    variables: {},
  });

  return new Promise((resolve, reject) => {
    // Axios config with access token and data
    const req_config = {
      method: "post",
      url: `${config.api_host}/api/graphql`,
      headers: {
        "X-ACCESS-TOKEN": token,
        "Content-Type": "application/json",
      },
      data: query,
    };

    axios(req_config)
      .then((data) => {
        if (data?.data?.data?.conversion) {
          resolve(data.data.data.conversion);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
};
