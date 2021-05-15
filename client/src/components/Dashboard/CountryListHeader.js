import React from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

function CountryListHeader({ updateConversion }) {
  return (
    <Grid container className="country country__header">
      <Grid item xs={3} sm={3} md={3}>
        <Typography>Country</Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Typography>Population</Typography>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <Typography>Currencies </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        <Typography>
          Amount in SEK{" "}
          <Tooltip placement="top" title="Fetch latest conversion rates">
            <IconButton
              size="small"
              style={{ color: "white", padding: 2 }}
              onClick={updateConversion}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default CountryListHeader;
