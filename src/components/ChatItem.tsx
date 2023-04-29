import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function ChatItem(props: any) {
  const { user } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          backgroundColor: "gray",
          padding: "5px",
          borderRadius: "2px",
        }}
      >
        <Box
          sx={{
            width: "50px",
            height: "50px",
            borderRadius: "100%",
            fontSize: "20px",
            backgroundColor: "lightgreen",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="p" variant="h6">
            {user.displayName ? user.displayName[0].toUpperCase() : ""}
          </Typography>
        </Box>
        {user.displayName}
      </Box>
    </>
  );
}

export default ChatItem;
