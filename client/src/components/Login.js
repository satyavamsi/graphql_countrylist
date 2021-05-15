import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { login } from "../controllers/loginController";
import "./css/Login.css";

import { useStateValue } from "../store/provider";
import { actionTypes } from "../store/reducer";
import { Redirect } from "react-router";
import SnackBar from "./common/SnackBar";

function Login() {
  const [state, dispatch] = useStateValue();

  const [form, setForm] = useState({ username: "", password: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [loading, setLoading] = useState(false);

  const closeSnackbar = () => {
    setSnackbar({ open: false, message: "" });
  };

  // Get the token
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let token = await login(form);
      if (token) {
        dispatch({
          type: actionTypes.SET_TOKEN,
          token: token,
        });
      } else {
        setSnackbar({ open: true, message: "Error while fetching token" });
      }
    } catch (err) {
      if (err.status === 429) {
        setSnackbar({
          open: true,
          message:
            "You have exceeded your request limit. Try again after 60 seconds",
        });
      }
    }
    setLoading(false);
  };

  // set the form data
  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      {state.token && <Redirect to="/" />}
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon className="lockIcon" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={form.username}
            onChange={handleForm}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleForm}
            id="password"
          />
          <Button
            disabled={!(form.username && form.password) || loading}
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            className={`submit${
              !(form.username && form.password) || loading ? "--disabled" : ""
            }`}
          >
            {loading ? <CircularProgress size={24} /> : "Log In"}
          </Button>
        </form>
      </div>
      <SnackBar snackbar={snackbar} closeSnackbar={closeSnackbar} />
    </Container>
  );
}

export default Login;
