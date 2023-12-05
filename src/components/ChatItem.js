import { Avatar, Badge, Box, Stack, Typography, styled } from "@mui/material";
import React from "react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
    },
  },
}));

const ChatItem = ({ message }) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "#f5f5f5",
        boxSizing: "border-box",
      }}
      p={2}
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        <Stack direction={"row"} spacing={2}>
          {message.status ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar>{message.name}</Avatar>
            </StyledBadge>
          ) : (
            <Avatar>{message.name}</Avatar>
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitile2" sx={{ fontWeight: 600 }}>{message.name}</Typography>
            <Typography variant="caption">{message.content}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">9:36</Typography>
          <Badge color="primary" badgeContent={2} sx={{ top: "-5px", right: "12px" }} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatItem;
