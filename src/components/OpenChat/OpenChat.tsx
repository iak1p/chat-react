import { Box, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { DIV_STYLE } from "../ChatItemSearch/ChatItemStyle";

interface User {
  displayName?: string;
  uid?: string;
  email?: string;
}

function OpenChat() {
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
    localStorage.setItem("currentChat", name);
  };
  const IMAGE_STYLE: any = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    fontSize: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `rgb(${Math.random() * 256},${Math.random() * 256},${
      Math.random() * 256
    })`,
  };

  return (
    <>
      {Object.entries(usersWithChat)?.map((user: any) => {
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
            <Box sx={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
              <Typography component="p" variant="h6" sx={{ fontSize: "16px" }}>
                {user[1].userInfo.displayName}
              </Typography>
              <Typography component="p" sx={{ color: "gray", fontSize: "14px" }}>
                last
              </Typography>
            </Box>
          </Box>
        );
      })}
    </>
  );
}

export default OpenChat;
