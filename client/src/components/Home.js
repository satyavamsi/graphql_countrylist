import React from "react";
import Header from "./common/Header";

import "./css/Dashboard.css";
import Dashboard from "./Dashboard/Dashboard";

import { useStateValue } from "../store/provider";
import { Redirect } from "react-router-dom";
function Home() {
  const [state, dispatch] = useStateValue();

  return state.token ? (
    <>
      <Header />
      <Dashboard />
    </>
  ) : (
    <Redirect to="/login" />
  );
}

export default Home;
