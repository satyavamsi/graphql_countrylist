const axios = require("axios");
const config = require("../config");

const getCountriesResolver = async (name) => {
  const countries = await getCountriesList(name);
  return countries;
};

const getCountriesList = async (name) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name}/`)
      .then((data) => {
        if (data && data.data) {
          resolve(data.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        resolve([]);
      });
  });
};

// Convert the rates to SEK by dividing the SEK / currency
// This is because of the api subscription limit - base currency is by default EURO
// So I am passing SEK to get EURO to SEK and EURO to CURRENCY and dividing them
const getConversionResolver = async (parent) => {
  // Handle if parent is null which means get all the currencies conversion rates
  const symbols = parent ? parent.currencies.map((cur) => cur.code) : [];
  const conversion_rate = await getConversion(
    symbols.join(",") + `${parent ? ",SEK" : ""}`
  );
  let rates = {};
  Object.keys(conversion_rate.rates).map((cur) => {
    rates[cur] = (
      conversion_rate.rates["SEK"] / conversion_rate.rates[cur]
    ).toFixed(4);
  });
  return rates;
};

const getConversion = async (symbols) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://data.fixer.io/api/latest?access_key=${config.api_key}&symbols=${symbols}`
      )
      .then((data) => {
        if (data && data.data) {
          resolve(data.data);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        resolve({});
      });
  });
};

module.exports = { getCountriesResolver, getConversionResolver };
