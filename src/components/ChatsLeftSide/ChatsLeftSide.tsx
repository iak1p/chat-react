import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { memo, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import ChatItemSearch from "../ChatItemSearch/ChatItemSearch";
import { HEADER_STYLE, LEFT_SIDE_STYLE } from "./ChatLeftSideStyle";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Navigate } from "react-router-dom";
import OpenChat from "../OpenChat/OpenChat";
import { useDispatch } from "react-redux";

interface User {
  displayName?: string;
  uid?: string;
  email?: string;
}

const ChatsLeftSide: React.FC = () => {
  const [error, setError] = useState<string>();
  const [usersAfterSearch, setUsersAfterSearch] = useState<User[]>([]);
  const [displayName, setDisplayName] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({});
  const dispatch = useDispatch();

  const currentUserUid = localStorage.getItem("uid") || "";

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

  const searchUser = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", displayName));

    try {
      const querySnapshot: any = await getDocs(q);
      let array: any | User[] = [];
      querySnapshot.forEach((doc: any) => {
        array.push(doc.data());
      });
      setUsersAfterSearch(array);
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

  const handleClick = async (clickedUser: any) => {
    const mixedId =
      clickedUser.uid > currentUserUid
        ? clickedUser.uid + currentUserUid
        : currentUserUid + clickedUser.uid;
    const docSnap = await getDoc(doc(db, "chats", mixedId));

    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, "chats", mixedId), { messages: [] });

        await updateDoc(doc(db, "userChats", clickedUser.uid), {
          [`${mixedId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [`${mixedId}.lastMessage`]: {
            date: "",
            message: "No messages",
          },
        });

        await updateDoc(doc(db, "userChats", currentUserUid), {
          [`${mixedId}.userInfo`]: {
            uid: clickedUser.uid,
            displayName: clickedUser.displayName,
          },
          [`${mixedId}.lastMessage`]: {
            date: "",
            message: "No messages",
          },
        });
      } catch (err) {}
    }
    dispatch({ type: "SET_MIXED_UID", payload: mixedId });
    dispatch({ type: "SET_CURRENT_CHAT", payload: clickedUser.displayName });
    dispatch({ type: "SET_CURRENT_CHAT_UID", payload: clickedUser.uid });
    setUsersAfterSearch([]);
    setDisplayName("");
  };

  return (
    <>
      <Box sx={LEFT_SIDE_STYLE}>
        <Box sx={HEADER_STYLE}>
          <Typography component="p">Current user: {currentUser.displayName}</Typography>
          <Button variant="contained" onClick={() => logOut()}>
            Log out
          </Button>
        </Box>
        <TextField
          id="outlined-basic"
          label="Search user"
          variant="outlined"
          size="small"
          sx={{ width: "100%", margin: "20px 0px" }}
          onChange={(e) => setDisplayName(e.target.value)}
          onKeyDown={(e) => {
            e.code === "Enter" && searchUser();
          }}
          value={displayName}
        />
        {error ? error : ""}
        {!usersAfterSearch ? (
          <Typography component="p">Current user</Typography>
        ) : (
          usersAfterSearch?.map((user) => (
            <ChatItemSearch user={user} key={user.uid} handleClick={handleClick} />
          ))
        )}
        <hr />
        <OpenChat />
      </Box>
    </>
  );
};

export default memo(ChatsLeftSide);
