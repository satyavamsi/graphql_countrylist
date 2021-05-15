import { Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import { useState } from "react";
import { getConversion } from "../../controllers/lookupController";

import { useStateValue } from "../../store/provider";
import { actionTypes } from "../../store/reducer";

import SnackBar from "../common/SnackBar";

import "../css/Dashboard.css";
import LookupDialog from "./LookupDialog";
import CountryList from "./CountryList";

function Dashboard() {
  const [state, dispatch] = useStateValue();
  const [lookup, setLookup] = useState(false);
  const [amount, setAmount] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  // Fetch all currencies conversion rates
  const updateConversion = async () => {
    setSnackbar({ open: true, message: "Fetching Latest Conversion rates" });
    try {
      let conversions = await getConversion(state.token);
      dispatch({
        type: actionTypes.SET_CONVERSION_JSON,
        conversions: conversions,
      });
    } catch (err) {
      if (err.status === 401) {
        setSnackbar({
          open: true,
          message: "Authentication failed/expired . Logout and login again",
        });
      } else if (err.status === 429) {
        setSnackbar({
          open: true,
          message:
            "You have exceeded your request limit. Try again after 60 seconds",
        });
      }
    }
  };

  // Fetch conversions on component mount
  useEffect(() => {
    updateConversion();
  }, []);

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  const handleCloseLookup = () => {
    setLookup(false);
  };

  const handleOpenLookup = () => {
    setLookup(true);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="dashboard">
      <div className="db__addCountry">
        <TextField
          variant="outlined"
          margin="normal"
          id="amount"
          label="Amount"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
        <Fab
          onClick={handleOpenLookup}
          className="db__fabButton"
          variant="extended"
        >
          <AddIcon className="db__fabIcon" />
          Add Country
        </Fab>
      </div>
      <CountryList updateConversion={updateConversion} amount={amount} />
      <LookupDialog
        setSnackbar={setSnackbar}
        handlePopupClose={handleCloseLookup}
        lookup={lookup}
      />
      <SnackBar snackbar={snackbar} closeSnackbar={closeSnackbar} />
    </div>
  );
}

export default Dashboard;
