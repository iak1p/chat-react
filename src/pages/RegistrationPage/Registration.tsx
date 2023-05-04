import { Alert, Button, Card, TextField, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BUTTON_STYLE, FORM_STYLE, INPUT_STYLE } from "./RegistrationPageStyle";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Registration = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    setError("");
    event.preventDefault();
    const email: string = event.target[0].value;
    const password: string = event.target[1].value;
    const nickname: string = event.target[2].value;

    try {
      let res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("uid", res.user.uid);

      await updateProfile(res.user, {
        displayName: nickname,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/chat");
    } catch (err: any) {
      setError(err.code);
    }
  };

  return (
    <>
      <Card sx={FORM_STYLE}>
        <Typography variant="h6" component="p">
          Registration
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
          <TextField
            id="displayName"
            label="Nickname"
            variant="standard"
            sx={INPUT_STYLE}
          />
          <Button variant="text" type="submit" sx={BUTTON_STYLE}>
            Continue
          </Button>
        </form>
        {error ? <Alert severity="error">{error}</Alert> : ""}
        <Typography component="p" sx={{}}>
          Already have account?
          <NavLink to="/authorisation">Authorisation</NavLink>
        </Typography>
      </Card>
    </>
  );
};

export default memo(Registration);
