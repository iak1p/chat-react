import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { memo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import Messages from "../Messages/Messages";
import NoSelectedChat from "../NoSelectedChat/NoSelectedChat";
import { CHAT_STYLE } from "./ChatsRightSideStyle";

const ChatRightSide: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const currentUserUid = localStorage.getItem("uid") || "";
  const mixedUID = useSelector((state: any) => state.mixedId);
  const currentChat = useSelector((state: any) => state.currentChat);
  const currentChatUID = useSelector((state: any) => state.currentChatUID);

  const ref: any = useRef();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (message !== "") {
        setMessage("");
        await updateDoc(doc(db, "chats", mixedUID), {
          messages: arrayUnion({
            id: crypto.randomUUID(),
            text: message,
            senderId: currentUserUid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, "userChats", currentUserUid), {
          [`${mixedUID}.lastMessage`]: {
            date: Date(),
            message: message,
          },
        });
        await updateDoc(doc(db, "userChats", currentChatUID), {
          [`${mixedUID}.lastMessage`]: {
            date: Date(),
            message: message,
          },
        });
      }
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
          {currentChat}
        </Typography>
        <Box sx={CHAT_STYLE} ref={ref}>
          {!mixedUID ? <NoSelectedChat /> : <Messages refDiv={ref} />}
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
};

export default memo(ChatRightSide);
