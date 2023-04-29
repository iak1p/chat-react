import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import ChatItem from "../ChatItem";
import { HEADER_STYLE, LEFT_SIDE_STYLE } from "./ChatLeftSideStyle";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Navigate } from "react-router-dom";

interface User {
  displayName?: string;
  uid?: string;
  email?: string;
}

export default function ChatsLeftSide() {
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<User>({});
  const [users, setUsers] = useState<User[]>([]);
  const [displayName, setDisplayName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      await onAuthStateChanged(auth, (userCur: any) => {
        if (userCur) {
          setUser(userCur);
        }
      });
    };

    fetchData().catch(console.error);
  });

  const searchUser = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", displayName));

    try {
      const querySnapshot: any = await getDocs(q);
      let array: any = [];
      querySnapshot.forEach((doc: any) => {
        array.push(doc.data());
      });
      setUsers(array);
    } catch (err: any) {
      setError(err.code);
    }
  };

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        localStorage.clear();
        <Navigate to="/authorisation" />;
      })
      .catch((err: any) => {
        setError(err.code);
      });
  };

  return (
    <>
      <Box sx={LEFT_SIDE_STYLE}>
        <Box sx={HEADER_STYLE}>
          <Typography component="p">Current user: {user.displayName}</Typography>
          <Button variant="contained" onClick={() => logOut()}>
            Log out
          </Button>
        </Box>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          size="small"
          sx={{ width: "100%", margin: "20px 0px" }}
          onChange={(e) => setDisplayName(e.target.value)}
          onKeyDown={(e) => {
            e.code === "Enter" && searchUser();
          }}
        />
        {users?.length === 0 ? "No users" : ""}
        {error ? error : ""}
        {users?.map((user) => {
          return <ChatItem user={user} key={user.uid} />;
        })}
      </Box>
    </>
  );
}
