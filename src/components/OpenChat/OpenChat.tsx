import { Box, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { DIV_STYLE, IMAGE_STYLE } from "../ChatItemSearch/ChatItemStyle";
import { LAST_MESSAGE_STYLE, USER_DIV_STYLE } from "./OpenChatStyle";

interface User {
  displayName?: string;
  uid?: string;
  email?: string;
  date: any;
}
const OpenChat = () => {
  const [usersWithChat, setUsersWithChat] = useState<User[]>([]);
  const currentUserUid = localStorage.getItem("uid") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUserUid), (doc: any) => {
        setUsersWithChat(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUserUid && getChats();
  }, [currentUserUid]);

  const handleClick = (uid: string, name: string) => {
    const mixedId = uid > currentUserUid ? uid + currentUserUid : currentUserUid + uid;

    dispatch({ type: "SET_MIXED_UID", payload: mixedId });
    dispatch({ type: "SET_CURRENT_CHAT", payload: name });
    dispatch({ type: "SET_CURRENT_CHAT_UID", payload: uid });
  };

  return (
    <>
      {Object.entries(usersWithChat)
        ?.sort(
          (a: any, b: any) =>
            Date.parse(b[1].lastMessage.date) - Date.parse(a[1].lastMessage.date)
        )
        .map((user: any) => {
          return (
            <Box
              sx={DIV_STYLE}
              key={user[1].userInfo.uid}
              onClick={() =>
                handleClick(user[1].userInfo.uid, user[1].userInfo.displayName)
              }
            >
              <Box sx={IMAGE_STYLE}>
                <Typography component="p" variant="h6">
                  {user[1].userInfo.displayName
                    ? user[1].userInfo.displayName[0].toUpperCase()
                    : ""}
                </Typography>
              </Box>
              <Box sx={USER_DIV_STYLE}>
                <Typography component="p" variant="h6" sx={{ fontSize: "16px" }}>
                  {user[1].userInfo.displayName}
                </Typography>
                <Typography component="p" sx={LAST_MESSAGE_STYLE}>
                  {user[1].lastMessage.message}
                </Typography>
                <Typography component="p" sx={LAST_MESSAGE_STYLE}>
                  {Math.floor(
                    (Date.now() - Date.parse(user[1].lastMessage.date)) / 1000 / 60
                  )}{" "}
                  minutes ago
                </Typography>
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default memo(OpenChat);
