import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase";
import Messages from "../Messages/Messages";

interface User {
  displayName?: string;
  uid?: string;
  email?: string;
}

export default function ChatRightSide() {
  const [message, setMessage] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({});
  const currentUserUid = localStorage.getItem("uid") || "";
  const mixedUID = useSelector((state: any) => state.mixedId);

  useEffect(() => {
    const fetchData = async () => {
      await onAuthStateChanged(auth, (userCur: any) => {
        if (userCur) {
          setCurrentUser(userCur);
        }
      });
    };

    fetchData().catch(console.error);
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (message !== "") {
        await updateDoc(doc(db, "chats", mixedUID), {
          messages: arrayUnion({
            id: Math.random() * 1000000000,
            text: message,
            senderId: currentUserUid,
            date: Timestamp.now(),
          }),
        });
      }
      setMessage("");
    } catch (error) {}
  };

  return (
    <>
      <Box
        sx={{ width: "78%", display: "flex", flexDirection: "column", padding: "20px" }}
      >
        <Typography
          component="p"
          variant="h6"
          sx={{
            borderBottom: "1px solid black",
          }}
        >
          {localStorage.getItem("currentChat")}
        </Typography>
        <Box
          sx={{
            height: "100%",
            overflow: "scroll",
            overflowX: "hidden",
            margin: "20px 0",
          }}
        >
          {!mixedUID ? "No chat" : <Messages />}
        </Box>
        <form onSubmit={handleSubmit} style={{ borderTop: "1px solid black" }}>
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            size="small"
            sx={{ width: "100%", margin: "20px 0px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </Box>
    </>
  );
}
