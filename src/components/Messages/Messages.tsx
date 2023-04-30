import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";

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
      {messages?.map((message: any) => (
        <p key={message.id}>{message.text}</p>
      ))}
    </>
  );
}

export default Messages;
