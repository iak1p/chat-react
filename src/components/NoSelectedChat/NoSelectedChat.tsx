import { Box, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { NO_MESSAGE_STYLE } from "./NoSelectedChatStyle";

const NoSelectedChat = () => {
  return (
    <>
      <Box>
        <Typography sx={NO_MESSAGE_STYLE}>
          No chat selected
          <SentimentVeryDissatisfiedIcon />
        </Typography>
      </Box>
    </>
  );
};

export default NoSelectedChat;
