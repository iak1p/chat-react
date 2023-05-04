import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DIV_STYLE, IMAGE_STYLE } from "./ChatItemStyle";

const ChatItemSearch = (props: any) => {
  const { user, handleClick } = props;

  return (
    <>
      <Box
        sx={DIV_STYLE}
        onClick={() => {
          handleClick(user);
        }}
      >
        <Box sx={IMAGE_STYLE}>
          <Typography component="p" variant="h6">
            {user.displayName ? user.displayName[0].toUpperCase() : ""}
          </Typography>
        </Box>
        <Typography component="p" sx={{ paddingLeft: "20px" }}>
          {user.displayName}
        </Typography>
      </Box>
    </>
  );
};

export default ChatItemSearch;
