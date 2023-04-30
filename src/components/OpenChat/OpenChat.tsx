import { Box, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { DIV_STYLE, IMAGE_STYLE } from "../ChatItemSearch/ChatItemStyle";

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

  const handleClick = (uid: string) => {
    const mixedId = uid > currentUserUid ? uid + currentUserUid : currentUserUid + uid;
    dispatch({ type: "SET_MIXED_UID", payload: mixedId });
  };

  return (
    <>
      {Object.entries(usersWithChat)?.map((user: any) => {
        return (
          <Box
            sx={DIV_STYLE}
            key={user[1].userInfo.uid}
            onClick={() => handleClick(user[1].userInfo.uid)}
          >
            <Box sx={IMAGE_STYLE}>
              <Typography component="p" variant="h6">
                {user[1].userInfo.displayName
                  ? user[1].userInfo.displayName[0].toUpperCase()
                  : ""}
              </Typography>
            </Box>
            {user[1].userInfo.displayName}
          </Box>
        );
      })}
    </>
  );
}

export default OpenChat;
