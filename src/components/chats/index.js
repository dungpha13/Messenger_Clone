import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Stack,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { MagnifyingGlass, NotePencil } from "phosphor-react";
import React from "react";
import { Messages_Data, Users_Data } from "../../data";
import ChatItem from "../ChatItem";

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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: 1,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#709CE6",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Chats = () => {
  return (
    <Box
      sx={{
        position: "relative",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        width: 320,
      }}
    >
      <Stack p={2} spacing={2} sx={{ height: "100vh", boxSizing: "border-box" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <NotePencil />
          </IconButton>
        </Stack>
        <Stack sx={{
          width: "100%",
          border: "1px solid #709CE6",
          borderRadius: 1,
        }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search something..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack direction={"row"} sx={{ flexGrow: 1, overflowY: "auto", height: "15%" }} spacing={2}>
          {Users_Data.map((el, i) =>
            el.status ? (
              <Box
                key={i}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src="#" sx={{ height: 48, width: 48 }}>{el.name}</Avatar>
                </StyledBadge>
                <Typography variant="caption">{el.name}</Typography>
              </Box>
            ) : (
              <Box
                key={i}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Avatar src="#" sx={{ height: 48, width: 48 }}>{el.name}</Avatar>
                <Typography variant="caption">{el.name}</Typography>
              </Box>
            )
          )}
        </Stack>
        <Stack direction={"column"} spacing={2} sx={{ flexGrow: 1, overflowX: "auto", height: "85%" }}>
          {Messages_Data.map((el, i) => (
            <ChatItem key={i} message={el} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
