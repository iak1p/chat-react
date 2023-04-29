import { Button, Card, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import {
  BUTTON_STYLE,
  FORM_STYLE,
  INPUT_STYLE,
  ERROR_TEXT,
} from "../RegistrationPage/RegistrationPageStyle";

function Authorisation() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    const email: string = event.target[0].value;
    const password: string = event.target[1].value;
    console.log(email, password);

    try {
      let res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", res.user.uid);
      dispatch({ type: "SET_USER", payload: res.user });
      navigate("/chat");
    } catch (err: any) {
      setError(err.code);
    }
  };

  return (
    <>
      <Card sx={FORM_STYLE}>
        <Typography variant="h6" component="p">
          Authorisation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            type="email"
            sx={INPUT_STYLE}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            type="password"
            sx={INPUT_STYLE}
          />
          <Button variant="text" type="submit" sx={BUTTON_STYLE}>
            Continue
          </Button>
        </form>
        {error ? (
          <Typography component="p" sx={ERROR_TEXT}>
            {error}
          </Typography>
        ) : (
          ""
        )}
        <Typography component="p" sx={{}}>
          Don't have account?
          <NavLink to="/registration">Registration</NavLink>
        </Typography>
      </Card>
    </>
  );
}

export default Authorisation;
