import { Card } from "@mui/material";
import React, { memo } from "react";
import ChatsLeftSide from "../../components/ChatsLeftSide/ChatsLeftSide";
import ChatRightSide from "../../components/ChatsRightSide/ChatRightSide";
import { CHAT_STYLE } from "./ChatPageStyle";

const ChatPage = () => {
  return (
    <>
      <Card sx={CHAT_STYLE}>
        <ChatsLeftSide />
        <ChatRightSide />
      </Card>
    </>
  );
};

export default memo(ChatPage);
