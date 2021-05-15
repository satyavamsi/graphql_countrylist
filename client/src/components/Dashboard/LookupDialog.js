import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LookupResults from "./LookupResults";

import { useStateValue } from "../../store/provider";
import { actionTypes } from "../../store/reducer";
import { getCountries } from "../../controllers/lookupController";

function LookupDialog({ handlePopupClose, lookup, setSnackbar }) {
  const [state, dispatch] = useStateValue();
  const [countryName, setCountryName] = useState("");
  const [searching, setSearching] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState(
    "Search results will show up here"
  );

  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleClose = () => {
    handlePopupClose(); // closes the dialog
    setSearching(false); // reset searching
    setCountryName(""); // reset conuntry name
    setEmptyMessage("Search results will show up here");
    emptyLookup(); // Cleanup search results
  };

  // Empty Lookup state
  const emptyLookup = () => {
    dispatch({
      type: actionTypes.SET_LOOKUP,
      lookup: [],
    });
  };

  const handleLookUp = async () => {
    setSearching(true); // Displays the progress bar
    setEmptyMessage("");
    emptyLookup(); // Clear search results if any

    // Try to get the countries and display snackbar if any errors
    try {
      let countriesList = await getCountries(state.token, countryName);
      if (countriesList.length === 0) {
        setEmptyMessage("No countries found");
      } else {
        // Update the search results state
        dispatch({
          type: actionTypes.SET_LOOKUP,
          lookup: countriesList,
        });
      }
      setCountryName("");
    } catch (err) {
      if (err.status === 401) {
        // Display snackbar with auth error
        setSnackbar({
          open: true,
          message: "Authentication failed/expired . Logout and login again",
        });
      } else if (err.status === 429) {
        // Display snackbar with max limit error
        setSnackbar({
          open: true,
          message:
            "You have exceeded your request limit. Try again after 60 seconds",
        });
      }
    }

    setSearching(false); // Hide the progress bar
  };

  return (
    <Dialog onClose={handleClose} open={lookup}>
      <div className="db__lookupHeader">
        <DialogTitle onClose={handleClose}>Add Country</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent className="db__lookup" dividers>
        <div className="db__lookupForm">
          <input
            value={countryName}
            onChange={handleChange}
            name="countryname"
            placeholder="Enter country name ..."
            type="text"
          ></input>
          <Fab
            disabled={!countryName}
            onClick={handleLookUp}
            className={`db__fabButton${countryName ? "" : "--disabled"}`}
            variant="extended"
          >
            Search
          </Fab>
        </div>
        <LookupResults emptyMessage={emptyMessage} searching={searching} />
      </DialogContent>
    </Dialog>
  );
}

export default LookupDialog;
