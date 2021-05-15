import React from "react";
import { Grid, Typography } from "@material-ui/core";

function CountryListItem({ country, conversions, amount }) {
  return (
    <Grid container className="country">
      <Grid item xs={3} sm={3} md={3}>
        <Typography>{country.name}</Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Typography>{country.population}</Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography>
          {country.currencies
            .filter((cur) => cur.code !== "(none)" && cur.name !== null)
            .map((cur, cur_i) => (
              <Typography
                style={{ borderBottom: "1px solid gray" }}
                key={`currency_${cur_i}_${cur.code}`}
              >
                {cur.name} - {cur.code}({cur.symbol})
                <br />
                <span
                  style={{
                    fontSize: 8,
                  }}
                >
                  1 {cur.code} = {conversions[cur.code]} SEK
                </span>
              </Typography>
            ))}
        </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        {country.currencies
          .filter((cur) => cur.code !== "(none)" && cur.name !== null)
          .map((cur, cur_i) => (
            <Typography
              style={{ borderBottom: "1px solid gray" }}
              key={`conversion_${cur_i}_${cur.code}`}
            >
              {(amount * conversions[cur.code]).toFixed(4)} SEK
              <br />
              <span style={{ fontSize: 8 }}>
                1 {cur.code} = {conversions[cur.code]} SEK
              </span>
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
}

export default CountryListItem;
