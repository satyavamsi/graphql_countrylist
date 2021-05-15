import React from "react";
import { Button, Typography, LinearProgress, Grid } from "@material-ui/core";

import { useStateValue } from "../../store/provider";
import { actionTypes } from "../../store/reducer";

function LookupResults({ searching, emptyMessage }) {
  const [state, dispatch] = useStateValue();

  // Add new country to state
  const handleAddCountry = async (country) => {
    dispatch({
      type: actionTypes.ADD_COUNTRY,
      country: country,
    });
  };

  return (
    /* add --empty to classname if search results are empty */
    <div
      className={`db__lookupResults${
        (searching || state.lookup.length) > 0 ? "" : "--empty"
      }`}
    >
      {/* If searching show a linear progress bar */}
      {searching ? <LinearProgress /> : null}

      {/* Loop through search results if there else show the emptyMessage*/}
      {state.lookup.length > 0 ? (
        <Grid container>
          <Grid container className="country country__header">
            <Grid item xs={5} sm={5} md={5}>
              <Typography>Country</Typography>
            </Grid>
            <Grid item xs={5} sm={5} md={5}>
              <Typography>Currencies - (Symbol)</Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2}></Grid>
          </Grid>
          {state.lookup.map((country, index) => {
            return (
              <Grid container key={`country_${index}`} className="country">
                <Grid item xs={5} sm={5} md={5}>
                  <Typography>{country.name}</Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={5}>
                  {/* Get the currency codes and join them as a string */}
                  <Typography>
                    {country.currencies
                      .filter(
                        (cur) => cur.code !== "(none)" && cur.name !== null
                      )
                      .map(
                        (cur) =>
                          `${cur.code} - (${cur.symbol ? cur.symbol : "N/A"})`
                      )
                      .join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <Button
                    onClick={handleAddCountry.bind(this, country)}
                    className="country__add"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography className="db__lookupResults__emptyMessage">
          {emptyMessage}
        </Typography>
      )}
    </div>
  );
}

export default LookupResults;
