import { Typography } from "@material-ui/core";
import React from "react";

import { useStateValue } from "../../store/provider";

import CountryListHeader from "./CountryListHeader";
import CountryListItem from "./CountryListItem";

function CountryList({ updateConversion, amount }) {
  const [state, dispatch] = useStateValue();
  return (
    <div className="db__countriesList">
      <CountryListHeader updateConversion={updateConversion} />
      {state.countries.map((country, index) => {
        return (
          <CountryListItem
            key={`country_item_${index}`}
            country={country}
            conversions={state.conversions}
            amount={amount}
          />
        );
      })}
      {state.countries.length === 0 && (
        <Typography className="db__countriesList__empty">
          No countries added yet.
        </Typography>
      )}
    </div>
  );
}

export default CountryList;
