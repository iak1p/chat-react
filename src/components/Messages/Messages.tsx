import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { OWNER, USER } from "./MessagesStyle";

function Messages() {
  const mixedUID = useSelector((state: any) => state.mixedId);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "chats", mixedUID), (doc: any) => {
        setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    };
    mixedUID && getChats();
  }, [mixedUID]);

  return (
    <>
      <Box sx={{ padding: "0 20px" }}>
        {messages?.map((message: any) => (
          <Typography
            key={message.id}
            sx={message.senderId === localStorage.getItem("uid") ? OWNER : USER}
          >
            {message.text}
          </Typography>
        ))}
      </Box>
    </>
  );
}

export default Messages;
